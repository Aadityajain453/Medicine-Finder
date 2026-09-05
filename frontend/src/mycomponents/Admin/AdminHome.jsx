import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdmNav";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ─── Inline styles as constants ────────────────────────────────────────────────

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: "'DM Sans', sans-serif",
    paddingBottom: "48px",
  },
  body: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "28px 24px",
  },

  // Welcome banner
  banner: {
    background: "#0f172a",
    borderRadius: "14px",
    padding: "28px 32px",
    marginBottom: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "16px",
  },
  bannerTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "24px",
    fontWeight: 700,
    color: "#fff",
    margin: "0 0 4px",
    letterSpacing: "-0.5px",
  },
  bannerSub: {
    color: "rgba(255,255,255,0.5)",
    fontSize: "14px",
    margin: 0,
  },
  onlinePill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    background: "rgba(34,211,238,0.1)",
    border: "0.5px solid rgba(34,211,238,0.3)",
    color: "#22d3ee",
    fontSize: "13px",
    padding: "7px 16px",
    borderRadius: "20px",
    whiteSpace: "nowrap",
  },
  pulseDot: {
    width: "7px",
    height: "7px",
    background: "#22d3ee",
    borderRadius: "50%",
  },

  // Layout grid
  grid: {
    display: "grid",
    gridTemplateColumns: "300px 1fr",
    gap: "20px",
    alignItems: "start",
  },

  // Profile card
  profileCard: {
    background: "#fff",
    border: "0.5px solid #e2e8f0",
    borderRadius: "14px",
    overflow: "hidden",
  },
  profileTop: {
    padding: "28px 24px 20px",
    textAlign: "center",
    borderBottom: "0.5px solid #e2e8f0",
  },
  avatarCircle: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    border: "4px solid #22d3ee",
    boxShadow: "0 10px 30px rgba(34,211,238,0.25)",
    background: "#0f172a",
    color: "#22d3ee",
    fontSize: "42px",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 18px",
    position: "relative",
  },

  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    background: "#22d3ee",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "12px",
    border: "2px solid white",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  },


  profileName: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "18px",
    fontWeight: 700,
    color: "#0f172a",
    margin: "0 0 3px",
  },
  profileRole: {
    fontSize: "11px",
    color: "#94a3b8",
    margin: "0 0 12px",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
  },
  statusPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    background: "#dcfce7",
    color: "#166534",
    fontSize: "12px",
    fontWeight: 500,
    padding: "4px 12px",
    borderRadius: "12px",
  },
  statusDot: {
    width: "6px",
    height: "6px",
    background: "#22c55e",
    borderRadius: "50%",
  },
  fieldList: { padding: "8px 20px 12px" },
  field: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    padding: "10px 0",
    borderBottom: "0.5px solid #f1f5f9",
  },
  fieldIcon: {
    width: "30px",
    height: "30px",
    background: "#f8fafc",
    borderRadius: "7px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: "1px",
  },
  fieldLabel: {
    fontSize: "10px",
    color: "#94a3b8",
    margin: "0 0 2px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  fieldValue: {
    fontSize: "13px",
    color: "#0f172a",
    fontWeight: 500,
    margin: 0,
  },

  // Right column
  right: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  // Stat cards
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
  },
  statCard: {
    background: "#fff",
    border: "0.5px solid #e2e8f0",
    borderRadius: "14px",
    padding: "18px 20px",
  },
  statValue: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "26px",
    fontWeight: 700,
    color: "#0f172a",
    margin: "10px 0 2px",
  },
  statLabel: { fontSize: "13px", color: "#64748b", margin: 0 },

  // Module cards
  modulesRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
  },
  moduleCard: {
    background: "#fff",
    border: "0.5px solid #e2e8f0",
    borderRadius: "14px",
    padding: "20px",
    cursor: "pointer",
    transition: "transform 0.15s, border-color 0.15s",
  },
  moduleIconBox: {
    width: "42px",
    height: "42px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "12px",
    fontSize: "20px",
  },
  moduleTitle: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#0f172a",
    margin: "0 0 4px",
  },
  moduleDesc: {
    fontSize: "12px",
    color: "#64748b",
    margin: "0 0 14px",
    lineHeight: "1.5",
  },
  moduleLink: {
    fontSize: "12px",
    color: "#64748b",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },

  // Activity feed
  activityCard: {
    background: "#fff",
    border: "0.5px solid #e2e8f0",
    borderRadius: "14px",
    padding: "20px",
  },
  activityHeading: {
    fontSize: "11px",
    fontWeight: 500,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.7px",
    margin: "0 0 14px",
  },
  activityRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "9px 0",
    borderBottom: "0.5px solid #f1f5f9",
  },
  activityDot: { width: "7px", height: "7px", borderRadius: "50%", flexShrink: 0 },
  activityText: { fontSize: "13px", color: "#0f172a", flex: 1 },
  activityTime: { fontSize: "12px", color: "#94a3b8" },

  // Loading / error states
  loadingText: {
    textAlign: "center",
    color: "#94a3b8",
    padding: "48px 0",
    fontSize: "14px",
  },
};

// ─── Sub-components ─────────────────────────────────────────────────────────────

const ProfileField = ({ icon, label, value }) => (
  <div style={styles.field}>
    <div style={styles.fieldIcon}>
      <i className={`ti ti-${icon}`} style={{ fontSize: "15px", color: "#94a3b8" }} aria-hidden="true" />
    </div>
    <div>
      <p style={styles.fieldLabel}>{label}</p>
      <p style={styles.fieldValue}>{value}</p>
    </div>
  </div>
);

const StatCard = ({ icon, iconColor, iconBg, value, label }) => (
  <div style={styles.statCard}>
    <i className={`ti ti-${icon}`} style={{ fontSize: "22px", color: iconColor, background: iconBg, padding: "6px", borderRadius: "8px" }} aria-hidden="true" />
    <p style={styles.statValue}>{value}</p>
    <p style={styles.statLabel}>{label}</p>
  </div>
);

const ModuleCard = ({ icon, iconColor, iconBg, title, description, onClick }) => (
  <div
    style={styles.moduleCard}
    onClick={onClick}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = "#cbd5e1"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "#e2e8f0"; }}
  >
    <div style={{ ...styles.moduleIconBox, background: iconBg }}>
      <i className={`ti ti-${icon}`} style={{ fontSize: "20px", color: iconColor }} aria-hidden="true" />
    </div>
    <p style={styles.moduleTitle}>{title}</p>
    <p style={styles.moduleDesc}>{description}</p>
    <span style={styles.moduleLink}>
      <i className="ti ti-arrow-right" style={{ fontSize: "13px" }} aria-hidden="true" />
      Manage
    </span>
  </div>
);

const ActivityItem = ({ color, text, time }) => (
  <div style={styles.activityRow}>
    <div style={{ ...styles.activityDot, background: color }} />
    <span style={styles.activityText}>{text}</span>
    <span style={styles.activityTime}>{time}</span>
  </div>
);

// ─── Main component ──────────────────────────────────────────────────────────────

const AdminHome = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const eml = admin?.Email;
  const [loading, setLoading] = useState(true);

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    verifyAndLoad();
  }, []);


  useEffect(() => {
    if (admin?.Email) {
      getPhoto();
    }
  }, [admin]);




  const getPhoto = async () => {
    let result = await fetch(
      'https://medicine-finder-1-zwuu.onrender.com/get_profile_photo', {
      method: "post",
      body: JSON.stringify({ eml }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    result = await result.json();

    if (result != null) {
      console.log(result);
      console.log("The file name is : ", result.filename);
      setPhoto(result.filename);
    }
  };


  const uploadfile = async () => {

    if (!file) {
      toast.warning("Please select an image");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);
    formData.append("Email", eml);

    try {

      const res = await axios.post(
        "https://medicine-finder-1-zwuu.onrender.com/uploadfile",
        formData
      );

      setPhoto(res.data.filename);

      toast.success("Photo uploaded successfully");

    } catch (err) {
      console.log(err);
    }
  };



  const uploadInstant = async (selectedFile) => {
    if (!selectedFile) return;

    const formData = new FormData();

    formData.append("file", selectedFile);
    formData.append("Email", eml);

    try {
      const res = await axios.post(
        "https://medicine-finder-1-zwuu.onrender.com/uploadfile",
        formData
      );

      setPhoto(res.data.filename);

      toast.success("Profile photo updated");
    } catch (err) {
      toast.error("Failed to upload photo");
      console.log(err);
    }
  };




  const deletePhoto = async () => {
    try {
      await axios.post(
        "https://medicine-finder-1-zwuu.onrender.com/delete_admin_photo",
        { Email: eml }
      );

      setPhoto(null);
      setPreview(null);
      toast.success("Photo deleted successfully");
    } catch (err) {
      toast.error("Failed to delete photo");
      console.log(err);
    }
  };


  const verifyAndLoad = async () => {
    try {
      const { data } = await axios.get("https://medicine-finder-1-zwuu.onrender.com/isUser");

      if (!data.usertype || data.usertype === "nouser" || data.usertype !== "admin") {
        navigate("/auth_error", { replace: true });
        return;
      }

      await fetchAdminProfile();
    } catch (err) {
      toast.error("Authentication failed");
      console.error("Auth check failed:", err);
      navigate("/auth_error", { replace: true });
    }
  };

  const fetchAdminProfile = async () => {
    try {
      const { data } = await axios.get("https://medicine-finder-1-zwuu.onrender.com/getAdminprofile");
      setAdmin(data);
    } catch (err) {
      toast.error("Failed to load profile");
      console.error("Failed to load admin profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const initial = admin?.Name?.charAt(0).toUpperCase() ?? "A";

  return (
    <>
      <div style={styles.page}>
        <AdminNavbar />

        <div style={styles.body}>

          {/* ── Welcome banner ── */}
          <div style={styles.banner}>
            <div>
              <h1 style={styles.bannerTitle}>
                Welcome back{admin ? `, ${admin.Name.split(" ")[0]}` : ""} 👋
              </h1>
              <p style={styles.bannerSub}>
                Here's what's happening across your system today.
              </p>
            </div>
            <div style={styles.onlinePill}>
              <span style={styles.pulseDot} />
              System Online
            </div>
          </div>

          {/* ── Main grid ── */}
          <div style={styles.grid}>

            {/* Profile card */}
            <div style={styles.profileCard}>
              <input
                id="profileUpload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  const selectedFile = e.target.files[0];

                  if (selectedFile) {
                    setPreview(URL.createObjectURL(selectedFile));
                    setFile(selectedFile);
                    uploadInstant(selectedFile);
                  }
                }}
              />
              <div style={styles.profileTop}>
                <div
                  style={{
                    ...styles.avatarCircle,
                    cursor: photo ? "pointer" : "default",
                    overflow: "hidden",
                    position: "relative"
                  }}
                  onClick={() => {
                    if (photo) {
                      window.open(
                        preview
                          ? preview
                          : `https://medicine-finder-1-zwuu.onrender.com/public/photos/${photo}`,
                        "_blank"
                      );
                    }
                  }}
                >
                  {photo ? (
                    <img
                      src={
                        preview
                          ? preview
                          : `https://medicine-finder-1-zwuu.onrender.com/public/photos/${photo}`
                      }
                      alt="Profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
                  ) : (
                    initial
                  )}
                </div>
                <p style={styles.profileName}>{admin?.Name ?? "—"}</p>
                <p style={styles.profileRole}>System Administrator</p>
                <span style={styles.statusPill}>
                  <span style={styles.statusDot} />
                  Active
                </span>
              </div>

              <div style={styles.fieldList}>
                {loading ? (
                  <p style={styles.loadingText}>Loading profile…</p>
                ) : (
                  <>
                    <ProfileField icon="user" label="Full name" value={admin?.Name} />
                    <ProfileField icon="mail" label="Email" value={admin?.Email} />
                    <ProfileField icon="phone" label="Contact" value={admin?.Contact} />
                    <ProfileField icon="map-pin" label="Address" value={admin?.Address} />
                    <ProfileField icon="shield-check" label="Role" value="Super Admin" />
                  </>
                )}


                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    marginTop: "15px",
                  }}
                >
                  <button
                    onClick={() =>
                      document.getElementById("profileUpload").click()
                    }
                    style={{
                      padding: "8px 15px",
                      background: "#22d3ee",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Upload Photo
                  </button>

                  {photo && (
                    <button
                      onClick={deletePhoto}
                      style={{
                        padding: "8px 15px",
                        background: "#dc2626",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
                *


              </div>
            </div>

            {/* Right column */}
            <div style={styles.right}>

              {/* Stats */}
              <div style={styles.statsRow}>
                <StatCard icon="pill" iconColor="#2563eb" iconBg="#eff6ff" value="1,284" label="Medicines" />
                <StatCard icon="building-hospital" iconColor="#059669" iconBg="#f0fdf4" value="37" label="Medical Stores" />
                <StatCard icon="users" iconColor="#7c3aed" iconBg="#f5f3ff" value="5" label="Admins" />
              </div>

              {/* Modules */}
              <div style={styles.modulesRow}>
                <ModuleCard
                  icon="pill" iconColor="#2563eb" iconBg="#eff6ff"
                  title="Medicines"
                  description="View, add, and manage medicine records across all stores."
                  onClick={() => navigate("/admin/medicines")}
                />
                <ModuleCard
                  icon="building-hospital" iconColor="#059669" iconBg="#f0fdf4"
                  title="Medical Stores"
                  description="Register and monitor approved medical store listings."
                  onClick={() => navigate("/admin/stores")}
                />
                <ModuleCard
                  icon="user-cog" iconColor="#7c3aed" iconBg="#f5f3ff"
                  title="Admins"
                  description="Add new administrators and review existing accounts."
                  onClick={() => navigate("/admin/admins")}
                />
              </div>

              {/* Activity feed */}
              <div style={styles.activityCard}>
                <p style={styles.activityHeading}>Recent activity</p>
                <ActivityItem color="#2563eb" text="New medicine record added — Paracetamol 500mg" time="2 min ago" />
                <ActivityItem color="#059669" text="MedPlus Store #14 approved" time="1 hr ago" />
                <ActivityItem color="#7c3aed" text="Admin account created — Priya Verma" time="Yesterday" />
              </div>

            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default AdminHome;