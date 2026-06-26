import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Briefcase,
  GraduationCap,
  FileText,
  User,
  Pencil,
  Save,
  X,
  Sparkles,
  Check,
  AlertCircle,
  Upload,
  Camera,
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const [resumeFile, setResumeFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const resumeRef = useRef(null);
  const photoRef = useRef(null);

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    bio: "",
    skills: "",
    location: "",
    linkedin: "",
    github: "",
    experience: "",
    education: "",
  });

  const populateForm = (parsed) => ({
    fullname: parsed.fullname || "",
    email: parsed.email || "",
    phoneNumber: parsed.phoneNumber || "",
    bio: parsed.profile?.bio || "",
    skills: parsed.profile?.skills?.join(", ") || "",
    location: parsed.profile?.location || "",
    linkedin: parsed.profile?.linkedin || "",
    github: parsed.profile?.github || "",
    experience: parsed.profile?.experience || "",
    education: parsed.profile?.education || "",
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      setFormData(populateForm(parsed));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 3500);
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview immediately
    const previewUrl = URL.createObjectURL(file);
    setPhotoPreview(previewUrl);

    // Upload to server
    try {
      const token = localStorage.getItem("token");
      const payload = new FormData();
      payload.append("file", file);
      payload.append("uploadType", "photo");

      const res = await axios.post(
        `${API_URL}/user/profile/update`,
        payload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        showToast("success", "Profile photo updated!");
      }
    } catch (error) {
      console.error(error);
      showToast("error", "Failed to upload photo.");
      setPhotoPreview(null);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");

      const payload = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        payload.append(key, val);
      });
      if (resumeFile) {
        payload.append("file", resumeFile);
        payload.append("uploadType", "resume");
      }

      const res = await axios.post(
        `${API_URL}/user/profile/update`,
        resumeFile ? payload : formData,
        {
          withCredentials: true,
          headers: {
            ...(resumeFile
              ? { "Content-Type": "multipart/form-data" }
              : { "Content-Type": "application/json" }),
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        setEditing(false);
        setResumeFile(null);
        showToast("success", "Profile updated successfully!");
      }
    } catch (error) {
      console.error(error);
      showToast("error", "Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData(populateForm(user));
    }
    setResumeFile(null);
    setEditing(false);
  };

  // ── Loading State ──
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #e0e7ff 0%, #ede9fe 40%, #fce7f3 100%)" }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-purple-200 border-t-purple-600"
            style={{ animation: "spin 0.8s linear infinite" }} />
          <p className="text-gray-500 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  // ── Reusable Field Component ──
  const Field = ({ icon: Icon, label, name, value, type = "text", fullWidth = false }) => (
    <div className={fullWidth ? "col-span-1 md:col-span-2" : ""}>
      <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest mb-2"
        style={{ color: "#8b5cf6", letterSpacing: "0.1em" }}>
        <Icon size={13} />
        {label}
      </label>
      {editing ? (
        name === "bio" || name === "experience" || name === "education" ? (
          <textarea
            name={name}
            value={formData[name]}
            onChange={handleChange}
            rows={3}
            placeholder={`Enter your ${label.toLowerCase()}...`}
            style={{
              width: "100%",
              padding: "12px 16px",
              background: "#fff",
              border: "1.5px solid #e5e7eb",
              borderRadius: "14px",
              fontSize: "14px",
              color: "#374151",
              outline: "none",
              resize: "none",
              transition: "all 0.2s ease",
              fontFamily: "inherit",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#8b5cf6";
              e.target.style.boxShadow = "0 0 0 3px rgba(139,92,246,0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e5e7eb";
              e.target.style.boxShadow = "none";
            }}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            placeholder={`Enter your ${label.toLowerCase()}...`}
            style={{
              width: "100%",
              padding: "12px 16px",
              background: "#fff",
              border: "1.5px solid #e5e7eb",
              borderRadius: "14px",
              fontSize: "14px",
              color: "#374151",
              outline: "none",
              transition: "all 0.2s ease",
              fontFamily: "inherit",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#8b5cf6";
              e.target.style.boxShadow = "0 0 0 3px rgba(139,92,246,0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e5e7eb";
              e.target.style.boxShadow = "none";
            }}
          />
        )
      ) : (
        <div style={{
          padding: "12px 16px",
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(10px)",
          borderRadius: "14px",
          fontSize: "14px",
          color: value ? "#374151" : "#9ca3af",
          border: "1px solid rgba(255,255,255,0.5)",
          minHeight: "46px",
          display: "flex",
          alignItems: "center",
          fontStyle: value ? "normal" : "italic",
          whiteSpace: "pre-wrap",
        }}>
          {value || "Not provided"}
        </div>
      )}
    </div>
  );

  // ── Section Header ──
  const SectionHeader = ({ icon: Icon, title }) => (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "20px",
      paddingBottom: "12px",
      borderBottom: "2px solid rgba(139,92,246,0.12)",
    }}>
      <div style={{
        width: "36px",
        height: "36px",
        borderRadius: "10px",
        background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        boxShadow: "0 4px 12px rgba(139,92,246,0.25)",
      }}>
        <Icon size={18} />
      </div>
      <h3 style={{
        fontSize: "18px",
        fontWeight: "700",
        color: "#1f2937",
        margin: 0,
      }}>{title}</h3>
    </div>
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #e0e7ff 0%, #ede9fe 40%, #fce7f3 100%)",
      padding: "40px 16px",
      fontFamily: "'Geist Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      {/* ── Toast Notification ── */}
      {toast.show && (
        <div style={{
          position: "fixed",
          top: "24px",
          right: "24px",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "14px 20px",
          borderRadius: "14px",
          background: toast.type === "success" ? "#ecfdf5" : "#fef2f2",
          border: `1.5px solid ${toast.type === "success" ? "#a7f3d0" : "#fecaca"}`,
          color: toast.type === "success" ? "#065f46" : "#991b1b",
          fontSize: "14px",
          fontWeight: "600",
          boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
          animation: "slideIn 0.3s ease-out",
        }}>
          {toast.type === "success" ? <Check size={18} /> : <AlertCircle size={18} />}
          {toast.message}
        </div>
      )}

      <div style={{ maxWidth: "820px", margin: "0 auto" }}>
        {/* ── Back Button ── */}
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#6b7280",
            fontWeight: "600",
            fontSize: "14px",
            background: "none",
            border: "none",
            cursor: "pointer",
            marginBottom: "24px",
            padding: "8px 0",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#7c3aed")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        {/* ── Main Card ── */}
        <div style={{
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.4)",
          borderRadius: "28px",
          overflow: "hidden",
          boxShadow: "0 25px 80px rgba(0,0,0,0.08), 0 4px 20px rgba(0,0,0,0.04)",
        }}>
          {/* ── Banner ── */}
          <div style={{
            height: "160px",
            background: "linear-gradient(135deg, #7c3aed 0%, #6366f1 40%, #3b82f6 80%, #06b6d4 100%)",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Decorative circles */}
            <div style={{
              position: "absolute", width: "200px", height: "200px", borderRadius: "50%",
              background: "rgba(255,255,255,0.08)", top: "-60px", right: "-20px",
            }} />
            <div style={{
              position: "absolute", width: "120px", height: "120px", borderRadius: "50%",
              background: "rgba(255,255,255,0.06)", bottom: "-30px", left: "60px",
            }} />
            <div style={{
              position: "absolute", width: "80px", height: "80px", borderRadius: "50%",
              background: "rgba(255,255,255,0.05)", top: "20px", left: "40%",
            }} />
          </div>

          {/* ── Profile Header ── */}
          <div style={{ padding: "0 36px", marginTop: "-70px", position: "relative", zIndex: 10 }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "24px", flexWrap: "wrap" }}>
              {/* Avatar */}
              <div style={{ position: "relative", cursor: "pointer" }} onClick={() => photoRef.current?.click()}>
                <input
                  ref={photoRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handlePhotoUpload}
                />
                {(photoPreview || user?.profile?.profilePhoto) ? (
                  <img
                    src={photoPreview || user?.profile?.profilePhoto}
                    alt="profile"
                    style={{
                      width: "130px",
                      height: "130px",
                      borderRadius: "22px",
                      border: "5px solid #fff",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                      objectFit: "cover",
                      background: "#fff",
                    }}
                  />
                ) : (
                  <div style={{
                    width: "130px",
                    height: "130px",
                    borderRadius: "22px",
                    border: "5px solid #fff",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                    background: "linear-gradient(135deg, #7c3aed, #6366f1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "48px",
                    fontWeight: "800",
                    color: "#fff",
                  }}>
                    {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
                {/* Camera overlay */}
                <div style={{
                  position: "absolute", bottom: "0", right: "0",
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #7c3aed, #6366f1)",
                  border: "3px solid #fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(124,58,237,0.4)",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <Camera size={16} style={{ color: "#fff" }} />
                </div>
              </div>

              {/* Name + Role */}
              <div style={{ flex: 1, paddingBottom: "12px", minWidth: "200px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
                  <div>
                    <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#1f2937", margin: "0 0 4px 0", lineHeight: 1.2 }}>
                      {editing ? formData.fullname : user.fullname}
                    </h1>
                    <p style={{ fontSize: "14px", color: "#6b7280", margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{
                        display: "inline-block",
                        padding: "3px 10px",
                        background: "linear-gradient(135deg, #ede9fe, #e0e7ff)",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "700",
                        color: "#7c3aed",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}>
                        {user.role === "Student" ? "Job Seeker" : user.role}
                      </span>
                      {(editing ? formData.location : user.profile?.location) && (
                        <span style={{ display: "flex", alignItems: "center", gap: "3px", color: "#9ca3af" }}>
                          <MapPin size={13} /> {editing ? formData.location : user.profile?.location}
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Edit / Save / Cancel Buttons */}
                  {!editing ? (
                    <button
                      onClick={() => setEditing(true)}
                      style={{
                        display: "flex", alignItems: "center", gap: "8px",
                        padding: "10px 22px", background: "linear-gradient(135deg, #7c3aed, #6366f1)",
                        color: "#fff", border: "none", borderRadius: "14px",
                        fontSize: "14px", fontWeight: "600", cursor: "pointer",
                        boxShadow: "0 6px 20px rgba(124,58,237,0.3)",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 25px rgba(124,58,237,0.4)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(124,58,237,0.3)"; }}
                    >
                      <Pencil size={15} /> Edit Profile
                    </button>
                  ) : (
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        onClick={handleCancel}
                        style={{
                          display: "flex", alignItems: "center", gap: "6px",
                          padding: "10px 18px", background: "#f3f4f6",
                          color: "#4b5563", border: "none", borderRadius: "14px",
                          fontSize: "14px", fontWeight: "600", cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#e5e7eb")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "#f3f4f6")}
                      >
                        <X size={15} /> Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        style={{
                          display: "flex", alignItems: "center", gap: "6px",
                          padding: "10px 22px", background: "linear-gradient(135deg, #059669, #10b981)",
                          color: "#fff", border: "none", borderRadius: "14px",
                          fontSize: "14px", fontWeight: "600", cursor: saving ? "wait" : "pointer",
                          boxShadow: "0 6px 20px rgba(16,185,129,0.3)",
                          opacity: saving ? 0.7 : 1, transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => { if (!saving) { e.currentTarget.style.transform = "translateY(-1px)"; } }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                      >
                        <Save size={15} /> {saving ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ── Profile Sections ── */}
          <div style={{ padding: "36px 36px 44px" }}>

            {/* ─── Personal Information ─── */}
            <div style={{ marginBottom: "36px" }}>
              <SectionHeader icon={User} title="Personal Information" />
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "18px",
              }}>
                <Field icon={User} label="Full Name" name="fullname" value={user.fullname} />
                <Field icon={Mail} label="Email Address" name="email" value={user.email} type="email" />
                <Field icon={Phone} label="Phone Number" name="phoneNumber" value={user.phoneNumber} type="tel" />
                <Field icon={MapPin} label="Location" name="location" value={user.profile?.location} />
              </div>
            </div>

            {/* ─── About Me ─── */}
            <div style={{ marginBottom: "36px" }}>
              <SectionHeader icon={FileText} title="About Me" />
              <Field icon={FileText} label="Bio" name="bio" value={user.profile?.bio} fullWidth />
            </div>

            {/* ─── Skills ─── */}
            <div style={{ marginBottom: "36px" }}>
              <SectionHeader icon={Sparkles} title="Skills" />
              {editing ? (
                <div>
                  <label style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    fontSize: "11px", fontWeight: "700", textTransform: "uppercase",
                    letterSpacing: "0.1em", color: "#8b5cf6", marginBottom: "8px",
                  }}>
                    <Sparkles size={13} /> Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="e.g. React, Node.js, Python, UI/UX Design..."
                    style={{
                      width: "100%", padding: "12px 16px", background: "#fff",
                      border: "1.5px solid #e5e7eb", borderRadius: "14px",
                      fontSize: "14px", color: "#374151", outline: "none",
                      transition: "all 0.2s", fontFamily: "inherit",
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "#8b5cf6"; e.target.style.boxShadow = "0 0 0 3px rgba(139,92,246,0.1)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; }}
                  />
                </div>
              ) : user.profile?.skills?.length > 0 ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {user.profile.skills.map((skill, i) => (
                    <span key={i} style={{
                      padding: "7px 16px",
                      background: "linear-gradient(135deg, #ede9fe, #e0e7ff)",
                      color: "#6d28d9",
                      borderRadius: "24px",
                      fontSize: "13px",
                      fontWeight: "600",
                      border: "1px solid rgba(139,92,246,0.15)",
                      transition: "all 0.2s",
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p style={{ color: "#9ca3af", fontStyle: "italic", fontSize: "14px", margin: 0 }}>
                  No skills added yet — click Edit to add your skills
                </p>
              )}
            </div>

            {/* ─── Professional Details ─── */}
            <div style={{ marginBottom: "36px" }}>
              <SectionHeader icon={Briefcase} title="Professional Details" />
              <div style={{ display: "grid", gap: "18px" }}>
                <Field icon={Briefcase} label="Experience" name="experience" value={user.profile?.experience} fullWidth />
                <Field icon={GraduationCap} label="Education" name="education" value={user.profile?.education} fullWidth />
              </div>
            </div>

            {/* ─── Social Links ─── */}
            <div style={{ marginBottom: "36px" }}>
              <SectionHeader icon={Linkedin} title="Social Links" />
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "18px",
              }}>
                <Field icon={Linkedin} label="LinkedIn URL" name="linkedin" value={user.profile?.linkedin} type="url" />
                <Field icon={Github} label="GitHub URL" name="github" value={user.profile?.github} type="url" />
              </div>
            </div>

            {/* ─── Resume ─── */}
            <div>
              <SectionHeader icon={Upload} title="Resume" />
              {editing ? (
                <div>
                  <label style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    fontSize: "11px", fontWeight: "700", textTransform: "uppercase",
                    letterSpacing: "0.1em", color: "#8b5cf6", marginBottom: "8px",
                  }}>
                    <Upload size={13} /> Upload Resume (PDF)
                  </label>
                  <div
                    onClick={() => resumeRef.current?.click()}
                    style={{
                      padding: "28px",
                      border: "2px dashed #d1d5db",
                      borderRadius: "16px",
                      textAlign: "center",
                      cursor: "pointer",
                      background: "rgba(255,255,255,0.6)",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#8b5cf6";
                      e.currentTarget.style.background = "rgba(139,92,246,0.03)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#d1d5db";
                      e.currentTarget.style.background = "rgba(255,255,255,0.6)";
                    }}
                  >
                    <input
                      ref={resumeRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      style={{ display: "none" }}
                      onChange={(e) => setResumeFile(e.target.files[0])}
                    />
                    <Upload size={28} style={{ color: "#9ca3af", margin: "0 auto 8px" }} />
                    <p style={{ color: "#6b7280", fontSize: "14px", fontWeight: "500", margin: "0 0 4px" }}>
                      {resumeFile ? resumeFile.name : "Click to upload your resume"}
                    </p>
                    <p style={{ color: "#9ca3af", fontSize: "12px", margin: 0 }}>PDF, DOC, DOCX — Max 5MB</p>
                  </div>
                </div>
              ) : user.profile?.resume ? (
                <a
                  href={user.profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "14px 22px",
                    background: "linear-gradient(135deg, #ede9fe, #e0e7ff)",
                    color: "#6d28d9",
                    borderRadius: "14px",
                    fontSize: "14px",
                    fontWeight: "600",
                    textDecoration: "none",
                    border: "1px solid rgba(139,92,246,0.15)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(139,92,246,0.2)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <FileText size={18} />
                  {user.profile.resumeOriginalname || "View Resume"}
                </a>
              ) : (
                <p style={{ color: "#9ca3af", fontStyle: "italic", fontSize: "14px", margin: 0 }}>
                  No resume uploaded yet — click Edit to upload
                </p>
              )}
            </div>

          </div>
        </div>

        {/* ── Profile Completion Hint ── */}
        {!editing && (
          <div style={{
            marginTop: "24px",
            padding: "18px 24px",
            background: "rgba(255,255,255,0.5)",
            backdropFilter: "blur(10px)",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.4)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}>
            <div style={{
              width: "40px", height: "40px", borderRadius: "12px",
              background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <Sparkles size={20} style={{ color: "#fff" }} />
            </div>
            <div>
              <p style={{ fontSize: "14px", fontWeight: "600", color: "#374151", margin: "0 0 2px" }}>
                Complete your profile
              </p>
              <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>
                A complete profile helps recruiters understand your potential and increases your chances of landing interviews.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── Keyframe Animations ── */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        input::placeholder, textarea::placeholder {
          color: #bcbcbc;
        }
      `}</style>
    </div>
  );
};

export default Profile;
