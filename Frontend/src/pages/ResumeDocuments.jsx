import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Home as HomeIcon,
  BookOpen,
  Calendar,
  User,
  LogOut,
  Briefcase,
  FileText,
  Upload,
  Download,
  Trash2,
  Eye,
  FileCode,
  FileSpreadsheet,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Plus,
} from "lucide-react";

const ResumeDocuments = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  // State for Resume
  const [resume, setResume] = useState(null);
  const resumeInputRef = useRef(null);

  // State for Additional Documents
  const [documents, setDocuments] = useState([]);
  const docsInputRef = useRef(null);

  // Load user data and localStorage documents
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const savedResume = localStorage.getItem("jobtale_resume");
    if (savedResume) {
      setResume(JSON.parse(savedResume));
    }

    const savedDocs = localStorage.getItem("jobtale_documents");
    if (savedDocs) {
      setDocuments(JSON.parse(savedDocs));
    }
  }, []);

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 3500);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // Convert File to Base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Format File Size
  const formatBytes = (bytes, decimals = 2) => {
    if (!bytes) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  // Handle Resume Upload
  const handleResumeUpload = async (e, isReplace = false) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type (PDF, DOC, DOCX)
    const allowedExtensions = ["pdf", "doc", "docx"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    
    if (!allowedExtensions.includes(fileExtension)) {
      showToast("error", "Only PDF, DOC, and DOCX files are allowed for resumes.");
      e.target.value = "";
      return;
    }

    try {
      const base64Data = await fileToBase64(file);
      const resumeData = {
        name: file.name,
        size: formatBytes(file.size),
        type: file.type,
        extension: fileExtension,
        uploadDate: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        data: base64Data,
      };

      setResume(resumeData);
      localStorage.setItem("jobtale_resume", JSON.stringify(resumeData));
      showToast("success", isReplace ? "Resume replaced successfully!" : "Resume uploaded successfully!");
    } catch (error) {
      console.error(error);
      showToast("error", "Error uploading resume. Please try again.");
    }
    
    e.target.value = ""; // Reset input
  };

  // Handle Resume Delete
  const handleResumeDelete = () => {
    setResume(null);
    localStorage.removeItem("jobtale_resume");
    showToast("success", "Resume deleted.");
  };

  // Handle Additional Documents Upload
  const handleDocsUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const allowedExtensions = ["pdf", "jpg", "jpeg", "png", "gif"];
    const uploadedDocs = [...documents];

    for (let file of files) {
      const fileExtension = file.name.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        showToast("error", `Unsupported file format for "${file.name}". PDF and images only.`);
        continue;
      }

      try {
        const base64Data = await fileToBase64(file);
        const newDoc = {
          id: Date.now() + Math.random().toString(36).substring(2, 9),
          name: file.name,
          size: formatBytes(file.size),
          type: file.type,
          extension: fileExtension,
          uploadDate: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          data: base64Data,
        };
        uploadedDocs.push(newDoc);
      } catch (error) {
        console.error(error);
        showToast("error", `Error loading file: ${file.name}`);
      }
    }

    setDocuments(uploadedDocs);
    localStorage.setItem("jobtale_documents", JSON.stringify(uploadedDocs));
    showToast("success", "Documents uploaded successfully!");
    e.target.value = ""; // Reset input
  };

  // Handle Document Delete
  const handleDocDelete = (docId) => {
    const updatedDocs = documents.filter((doc) => doc.id !== docId);
    setDocuments(updatedDocs);
    localStorage.setItem("jobtale_documents", JSON.stringify(updatedDocs));
    showToast("success", "Document deleted.");
  };

  // View / Open File in New Tab
  const viewFile = (fileData) => {
    if (!fileData || !fileData.data) return;
    try {
      const newTab = window.open();
      if (newTab) {
        newTab.document.write(
          `<iframe src="${fileData.data}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`
        );
      } else {
        showToast("error", "Pop-up blocked. Please allow popups to view files.");
      }
    } catch (e) {
      console.error(e);
      showToast("error", "Unable to view file. Please download it instead.");
    }
  };

  // Download File
  const downloadFile = (fileData) => {
    if (!fileData || !fileData.data) return;
    const link = document.createElement("a");
    link.href = fileData.data;
    link.download = fileData.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper to determine suitable document icon
  const getDocIcon = (extension) => {
    if (extension === "pdf") {
      return <FileText className="text-red-500 w-10 h-10" />;
    } else if (["jpg", "jpeg", "png", "gif"].includes(extension)) {
      return <ImageIcon className="text-blue-500 w-10 h-10" />;
    } else if (["doc", "docx"].includes(extension)) {
      return <FileCode className="text-indigo-500 w-10 h-10" />;
    }
    return <FileText className="text-purple-500 w-10 h-10" />;
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans overflow-hidden">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl transition-all duration-300 border animate-fade-in
          ${toast.type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}`}
        >
          {toast.type === "success" ? <CheckCircle size={20} className="text-green-600" /> : <AlertCircle size={20} className="text-red-600" />}
          <span className="font-bold text-sm">{toast.message}</span>
        </div>
      )}

      {/* Sidebar Layout */}
      <div className="w-64 bg-white shadow-[10px_0_30px_-15px_rgba(0,0,0,0.05)] border-r border-gray-100 p-6 flex flex-col h-full z-20 relative">
        <div className="flex items-center gap-2 mb-10 pl-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Briefcase size={16} className="text-white" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Job<span className="text-purple-600">tale</span>
          </h2>
        </div>

        <nav className="space-y-1.5 flex-1">
          <Link to="/dashboard" state={{ tab: "Dashboard" }}>
            <div className="flex items-center gap-3.5 text-gray-500 font-bold cursor-pointer hover:bg-gray-50 hover:text-gray-900 px-4 py-3.5 rounded-[1rem] transition-all duration-300 border border-transparent">
              <HomeIcon size={20} /> Dashboard
            </div>
          </Link>

          <Link to="/dashboard" state={{ tab: "Jobs" }}>
            <div className="flex items-center gap-3.5 text-gray-500 font-bold cursor-pointer hover:bg-gray-50 hover:text-gray-900 px-4 py-3.5 rounded-[1rem] transition-all duration-300 border border-transparent">
              <BookOpen size={20} /> Jobs
            </div>
          </Link>

          <Link to="/dashboard" state={{ tab: "Schedule" }}>
            <div className="flex items-center gap-3.5 text-gray-500 font-bold cursor-pointer hover:bg-gray-50 hover:text-gray-900 px-4 py-3.5 rounded-[1rem] transition-all duration-300 border border-transparent">
              <Calendar size={20} /> Schedule
            </div>
          </Link>

          <Link to="/profile">
            <div className="flex items-center gap-3.5 text-gray-500 font-bold cursor-pointer hover:bg-gray-50 hover:text-gray-900 px-4 py-3.5 rounded-[1rem] transition-all duration-300 mt-2 border border-transparent">
              <User size={20} /> Profile
            </div>
          </Link>

          <div className="flex items-center gap-3.5 font-bold cursor-pointer px-4 py-3.5 rounded-[1rem] transition-all duration-300 mt-2 bg-purple-50 text-purple-700 shadow-sm border border-purple-100/50">
            <FileText size={20} className="text-purple-600" /> Resume & Documents
          </div>
        </nav>

        <div className="mt-auto px-2">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-2xl border border-purple-100/50 mb-4 text-center">
            <p className="text-xs font-bold text-gray-800 mb-1">Upgrade to Premium</p>
            <p className="text-[10px] font-medium text-gray-500 mb-3">Get 3x more interview calls.</p>
            <button className="bg-white text-purple-700 px-4 py-1.5 rounded-lg text-xs font-bold w-full shadow-sm hover:shadow-md transition">Go Pro</button>
          </div>

          <div
            onClick={handleLogout}
            className="flex items-center gap-3.5 text-gray-500 font-bold cursor-pointer hover:text-red-600 hover:bg-red-50 px-4 py-3.5 rounded-[1rem] transition-all"
          >
            <LogOut size={20} /> Logout
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto relative pb-10">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-gradient-to-b from-purple-50/50 to-transparent rounded-bl-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto p-6 md:p-10 relative z-10 w-full">
          {/* Header */}
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight mb-2">Resume & Documents</h2>
              <p className="text-gray-500 font-medium">Upload, manage, and replace your resume and certifications</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            
            {/* Card 1: Resume Upload */}
            <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-extrabold text-gray-800 tracking-tight">My Resume</h3>
                {resume && (
                  <span className="px-3 py-1 bg-purple-50 border border-purple-100 text-purple-700 text-xs font-bold rounded-lg uppercase tracking-wider">
                    Uploaded
                  </span>
                )}
              </div>

              {!resume ? (
                // Empty State
                <div 
                  onClick={() => resumeInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 hover:border-purple-400 hover:bg-purple-50/20 transition-all rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer group"
                >
                  <input
                    type="file"
                    ref={resumeInputRef}
                    onChange={(e) => handleResumeUpload(e, false)}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                  <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm text-purple-600">
                    <Upload size={28} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-1">Upload your primary resume</h4>
                  <p className="text-gray-500 text-xs max-w-sm mb-4">
                    Supports PDF, DOC, and DOCX formats. Recommended file size under 5MB.
                  </p>
                  <button className="bg-gray-900 text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
                    Select File
                  </button>
                </div>
              ) : (
                // File Details & Actions
                <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100/80 gap-4 hover:shadow-sm transition-all duration-300">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-14 h-14 bg-white border border-gray-100 shadow-sm rounded-xl flex items-center justify-center flex-shrink-0">
                      {getDocIcon(resume.extension)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-gray-800 text-base truncate pr-2" title={resume.name}>
                        {resume.name}
                      </h4>
                      <p className="text-xs text-gray-500 font-medium mt-1">
                        Size: <span className="text-gray-700 font-bold">{resume.size}</span> • Uploaded: <span className="text-gray-700 font-bold">{resume.uploadDate}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button 
                      onClick={() => viewFile(resume)}
                      className="flex items-center gap-1.5 bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 border border-gray-200 px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all"
                    >
                      <Eye size={14} /> View
                    </button>
                    <button 
                      onClick={() => downloadFile(resume)}
                      className="flex items-center gap-1.5 bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 border border-gray-200 px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all"
                    >
                      <Download size={14} /> Download
                    </button>
                    <button 
                      onClick={() => resumeInputRef.current?.click()}
                      className="flex items-center gap-1.5 bg-white text-purple-700 hover:bg-purple-100 hover:text-purple-800 border border-purple-200/50 px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all"
                    >
                      <Upload size={14} /> Replace
                      <input
                        type="file"
                        ref={resumeInputRef}
                        onChange={(e) => handleResumeUpload(e, true)}
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                      />
                    </button>
                    <button 
                      onClick={handleResumeDelete}
                      className="flex items-center justify-center w-9 h-9 bg-white text-red-500 border border-gray-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200 rounded-xl shadow-sm transition-all"
                      title="Delete Resume"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Card 2: Documents & Certificates */}
            <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-extrabold text-gray-800 tracking-tight">Documents & Certificates</h3>
                  <p className="text-xs text-gray-400 font-semibold mt-0.5">Upload academic transcripts, certificates, or letters of recommendation</p>
                </div>
                <button 
                  onClick={() => docsInputRef.current?.click()}
                  className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/20 transition-all transform hover:-translate-y-0.5 duration-300 self-start sm:self-auto"
                >
                  <Plus size={15} /> Add Document
                  <input
                    type="file"
                    ref={docsInputRef}
                    onChange={handleDocsUpload}
                    multiple
                    accept=".pdf,image/*"
                    className="hidden"
                  />
                </button>
              </div>

              {documents.length === 0 ? (
                // Empty State
                <div className="border-2 border-dashed border-gray-100 rounded-2xl p-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100 shadow-inner text-gray-300">
                    <FileSpreadsheet size={26} />
                  </div>
                  <h4 className="text-base font-bold text-gray-700 mb-1">No documents uploaded yet</h4>
                  <p className="text-gray-400 text-xs max-w-sm mb-4">
                    Add supporting documents like degree certificates, mark sheets, and experience letters.
                  </p>
                </div>
              ) : (
                // Grid layout for multiple files
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {documents.map((doc) => (
                    <div 
                      key={doc.id} 
                      className="bg-gray-50/50 hover:bg-gray-50 rounded-2xl border border-gray-100 p-5 flex flex-col justify-between hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-3 mb-4 min-w-0">
                        <div className="w-12 h-12 bg-white border border-gray-100 shadow-sm rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                          {getDocIcon(doc.extension)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-extrabold text-gray-800 text-sm truncate" title={doc.name}>
                            {doc.name}
                          </h4>
                          <p className="text-[10px] text-gray-400 font-semibold mt-1">
                            Uploaded: {doc.uploadDate}
                          </p>
                          <p className="text-[10px] text-gray-500 font-bold mt-0.5">
                            {doc.size}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-1.5 border-t border-gray-100/80 pt-3">
                        <button 
                          onClick={() => viewFile(doc)}
                          className="flex items-center gap-1 bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 border border-gray-200 px-3 py-1.5 rounded-lg text-[11px] font-bold shadow-sm transition-all"
                          title="View"
                        >
                          <Eye size={12} /> View
                        </button>
                        <button 
                          onClick={() => downloadFile(doc)}
                          className="flex items-center gap-1 bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 border border-gray-200 px-3 py-1.5 rounded-lg text-[11px] font-bold shadow-sm transition-all"
                          title="Download"
                        >
                          <Download size={12} /> Download
                        </button>
                        <button 
                          onClick={() => handleDocDelete(doc.id)}
                          className="flex items-center justify-center w-8 h-8 bg-white text-red-500 border border-gray-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200 rounded-lg shadow-sm transition-all ml-auto"
                          title="Delete"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeDocuments;
