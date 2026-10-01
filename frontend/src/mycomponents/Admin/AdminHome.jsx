import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdmNav";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ─────────────────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────────────────

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: "'DM Sans', sans-serif",
    paddingBottom: "48px",
    width: "100%",
    overflowX: "hidden",
  },

  body: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "28px 24px",
    width: "100%",
    boxSizing: "border-box",
  },

  // ─── Welcome banner ───────────────────────────────────────────────────────

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
    boxSizing: "border-box",
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

  // ─── Main grid ────────────────────────────────────────────────────────────

  grid: {
    display: "grid",
    gridTemplateColumns: "300px 1fr",
    gap: "20px",
    alignItems: "start",
  },

  // ─── Profile card ─────────────────────────────────────────────────────────

  profileCard: {
    background: "#fff",
    border: "0.5px solid #e2e8f0",
    borderRadius: "14px",
    overflow: "hidden",
    minWidth: 0,
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
    boxSizing: "border-box",
  },

  profileName: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "18px",
    fontWeight: 700,
    color: "#0f172a",
    margin: "0 0 3px",
    wordBreak: "break-word",
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

  fieldList: {
    padding: "8px 20px 12px",
    minWidth: 0,
  },

  field: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    padding: "10px 0",
    borderBottom: "0.5px solid #f1f5f9",
    minWidth: 0,
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
    overflowWrap: "anywhere",
    wordBreak: "break-word",
  },

  // ─── Right column ─────────────────────────────────────────────────────────

  right: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    minWidth: 0,
  },

  // ─── Stat cards ───────────────────────────────────────────────────────────

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
    minWidth: 0,
    boxSizing: "border-box",
  },

  statValue: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "26px",
    fontWeight: 700,
    color: "#0f172a",
    margin: "10px 0 2px",
  },

  statLabel: {
    fontSize: "13px",
    color: "#64748b",
    margin: 0,
  },

  // ─── Module cards ─────────────────────────────────────────────────────────

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
    minWidth: 0,
    boxSizing: "border-box",
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

  // ─── Activity feed ────────────────────────────────────────────────────────

  activityCard: {
    background: "#fff",
    border: "0.5px solid #e2e8f0",
    borderRadius: "14px",
    padding: "20px",
    minWidth: 0,
    boxSizing: "border-box",
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
    minWidth: 0,
  },

  activityDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    flexShrink: 0,
  },

  activityText: {
    fontSize: "13px",
    color: "#0f172a",
    flex: 1,
    minWidth: 0,
    overflowWrap: "anywhere",
  },

  activityTime: {
    fontSize: "12px",
    color: "#94a3b8",
    flexShrink: 0,
    whiteSpace: "nowrap",
  },

  loadingText: {
    textAlign: "center",
    color: "#94a3b8",
    padding: "48px 0",
    fontSize: "14px",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Profile Field
// ─────────────────────────────────────────────────────────────────────────────

const ProfileField = ({ icon, label, value }) => (
  <div style={styles.field}>
    <div style={styles.fieldIcon}>
      <i
        className={`ti ti-${icon}`}
        style={{
          fontSize: "15px",
          color: "#94a3b8",
        }}
        aria-hidden="true"
      />
    </div>

    <div style={{ minWidth: 0, flex: 1 }}>
      <p style={styles.fieldLabel}>{label}</p>
      <p style={styles.fieldValue}>{value || "—"}</p>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Stat Card
// ─────────────────────────────────────────────────────────────────────────────

const StatCard = ({
  icon,
  iconColor,
  iconBg,
  value,
  label,
}) => (
  <div style={styles.statCard}>
    <i
      className={`ti ti-${icon}`}
      style={{
        fontSize: "22px",
        color: iconColor,
        background: iconBg,
        padding: "6px",
        borderRadius: "8px",
      }}
      aria-hidden="true"
    />

    <p style={styles.statValue}>{value}</p>
    <p style={styles.statLabel}>{label}</p>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Module Card
// ─────────────────────────────────────────────────────────────────────────────

const ModuleCard = ({
  icon,
  iconColor,
  iconBg,
  title,
  description,
  onClick,
}) => (
  <div
    style={styles.moduleCard}
    onClick={onClick}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-3px)";
      e.currentTarget.style.borderColor = "#cbd5e1";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.borderColor = "#e2e8f0";
    }}
  >
    <div
      style={{
        ...styles.moduleIconBox,
        background: iconBg,
      }}
    >
      <i
        className={`ti ti-${icon}`}
        style={{
          fontSize: "20px",
          color: iconColor,
        }}
        aria-hidden="true"
      />
    </div>

    <p style={styles.moduleTitle}>{title}</p>

    <p style={styles.moduleDesc}>
      {description}
    </p>

    <span style={styles.moduleLink}>
      <i
        className="ti ti-arrow-right"
        style={{ fontSize: "13px" }}
        aria-hidden="true"
      />
      Manage
    </span>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Activity Item
// ─────────────────────────────────────────────────────────────────────────────

const ActivityItem = ({ color, text, time }) => (
  <div style={styles.activityRow}>
    <div
      style={{
        ...styles.activityDot,
        background: color,
      }}
    />

    <span style={styles.activityText}>
      {text}
    </span>

    <span style={styles.activityTime}>
      {time}
    </span>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────

const AdminHome = () => {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);
  const eml = admin?.Email;

  const [loading, setLoading] = useState(true);

  const [dashboardStats, setDashboardStats] = useState({
    medicines: 0,
    medicalStores: 0,
    admins: 0
  });

  const [statsLoading, setStatsLoading] = useState(true);

  const [preview, setPreview] = useState(null);
  const [photo, setPhoto] = useState(null);

  const [recentActivity, setRecentActivity] = useState([]);
  const [activityLoading, setActivityLoading] = useState(true);

  // Responsive state
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // ───────────────────────────────────────────────────────────────────────────
  // Responsive screen detection
  // ───────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = screenWidth <= 576;
  const isTablet = screenWidth > 576 && screenWidth <= 900;

  // ───────────────────────────────────────────────────────────────────────────
  // Responsive styles
  // ───────────────────────────────────────────────────────────────────────────

  const responsiveBody = {
    ...styles.body,
    padding: isMobile
      ? "16px 12px"
      : isTablet
        ? "22px 18px"
        : "28px 24px",
  };

  const responsiveBanner = {
    ...styles.banner,
    padding: isMobile
      ? "20px 18px"
      : isTablet
        ? "24px"
        : "28px 32px",
    marginBottom: isMobile ? "16px" : "24px",
    flexDirection: isMobile ? "column" : "row",
    alignItems: isMobile ? "flex-start" : "center",
  };

  const responsiveBannerTitle = {
    ...styles.bannerTitle,
    fontSize: isMobile ? "20px" : "24px",
    lineHeight: "1.3",
  };

  const responsiveBannerSub = {
    ...styles.bannerSub,
    fontSize: isMobile ? "12px" : "14px",
    lineHeight: "1.5",
  };

  const responsiveGrid = {
    ...styles.grid,
    gridTemplateColumns: isMobile
      ? "1fr"
      : isTablet
        ? "220px 1fr"
        : "300px 1fr",
    gap: isMobile ? "16px" : "20px",
  };

  const responsiveStatsRow = {
    ...styles.statsRow,
    gridTemplateColumns: isMobile
      ? "1fr"
      : isTablet
        ? "repeat(3, 1fr)"
        : "repeat(3, 1fr)",
  };

  const responsiveModulesRow = {
    ...styles.modulesRow,
    gridTemplateColumns: isMobile
      ? "1fr"
      : isTablet
        ? "repeat(2, 1fr)"
        : "repeat(3, 1fr)",
  };

  const responsiveProfileTop = {
    ...styles.profileTop,
    padding: isMobile
      ? "22px 16px 18px"
      : "28px 24px 20px",
  };

  const responsiveAvatar = {
    ...styles.avatarCircle,
    width: isMobile ? "100px" : "120px",
    height: isMobile ? "100px" : "120px",
    fontSize: isMobile ? "36px" : "42px",
  };

  const responsiveFieldList = {
    ...styles.fieldList,
    padding: isMobile
      ? "8px 16px 14px"
      : "8px 20px 12px",
  };

  const responsiveActivityCard = {
    ...styles.activityCard,
    padding: isMobile ? "16px" : "20px",
  };

  // ───────────────────────────────────────────────────────────────────────────
  // Authentication + profile
  // ───────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    verifyAndLoad();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (admin?.Email) {
      getPhoto();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin]);

  const getPhoto = async () => {
    try {
      let result = await fetch(
        "https://medicine-finder-1-zwuu.onrender.com/get_profile_photo",
        {
          method: "POST",
          body: JSON.stringify({ eml }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      result = await result.json();

      if (result != null) {
        setPhoto(result.filename);
      }
    } catch (err) {
      console.error("Failed to load profile photo:", err);
    }
  };

  // ───────────────────────────────────────────────────────────────────────────
  // Upload Photo
  // ───────────────────────────────────────────────────────────────────────────

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

  // ───────────────────────────────────────────────────────────────────────────
  // Delete Photo
  // ───────────────────────────────────────────────────────────────────────────

  const deletePhoto = async () => {
    try {
      await axios.post(
        "https://medicine-finder-1-zwuu.onrender.com/delete_admin_photo",
        {
          Email: eml,
        }
      );

      setPhoto(null);
      setPreview(null);

      toast.success("Photo deleted successfully");
    } catch (err) {
      toast.error("Failed to delete photo");
      console.log(err);
    }
  };

  // ───────────────────────────────────────────────────────────────────────────
  // Verify User
  // ───────────────────────────────────────────────────────────────────────────

  const verifyAndLoad = async () => {
    try {
      const { data } = await axios.get(
        "https://medicine-finder-1-zwuu.onrender.com/isUser"
      );

      if (
        !data.usertype ||
        data.usertype === "nouser" ||
        data.usertype !== "admin"
      ) {
        navigate("/auth_error", { replace: true });
        return;
      }

      await fetchAdminProfile();
      await fetchDashboardStats();
      await fetchRecentActivity();
    } catch (err) {
      toast.error("Authentication failed");
      console.error("Auth check failed:", err);

      navigate("/auth_error", {
        replace: true,
      });
    }
  };

  // ───────────────────────────────────────────────────────────────────────────
  // Fetch Admin Profile
  // ───────────────────────────────────────────────────────────────────────────

  const fetchAdminProfile = async () => {
    try {
      const { data } = await axios.get(
        "https://medicine-finder-1-zwuu.onrender.com/getAdminprofile"
      );

      setAdmin(data);
    } catch (err) {
      toast.error("Failed to load profile");

      console.error(
        "Failed to load admin profile:",
        err
      );
    } finally {
      setLoading(false);
    }
  };


  const fetchDashboardStats = async () => {
    try {

      setStatsLoading(true);

      const { data } = await axios.get(
        "https://medicine-finder-1-zwuu.onrender.com/adminDashboardStats"
      );

      if (data.success) {

        setDashboardStats({
          medicines: data.medicines,
          medicalStores: data.medicalStores,
          admins: data.admins
        });

      }

    } catch (error) {

      console.error(
        "Failed to fetch dashboard statistics:",
        error
      );

      toast.error("Failed to load dashboard statistics");

    } finally {

      setStatsLoading(false);

    }
  };


  const fetchRecentActivity = async () => {
    try {

      setActivityLoading(true);

      const { data } = await axios.get(
        "https://medicine-finder-1-zwuu.onrender.com/adminRecentActivity"
      );

      if (data.success) {
        setRecentActivity(data.activity);
      }

    } catch (error) {

      console.error(
        "Failed to fetch recent activity:",
        error
      );

      toast.error("Failed to load recent activity");

    } finally {

      setActivityLoading(false);

    }
  };

  const initial =
    admin?.Name?.charAt(0).toUpperCase() ?? "A";

  // ───────────────────────────────────────────────────────────────────────────
  // JSX
  // ───────────────────────────────────────────────────────────────────────────

  return (
    <>
      <div style={styles.page}>

        <AdminNavbar />

        <div style={responsiveBody}>

          {/* ───────────────── Welcome Banner ───────────────── */}

          <div style={responsiveBanner}>

            <div style={{ minWidth: 0 }}>

              <h1 style={responsiveBannerTitle}>
                Welcome back
                {admin
                  ? `, ${admin.Name.split(" ")[0]}`
                  : ""}{" "}
                👋
              </h1>

              <p style={responsiveBannerSub}>
                Here's what's happening across your system today.
              </p>

            </div>

            <div style={styles.onlinePill}>
              <span style={styles.pulseDot} />
              System Online
            </div>

          </div>

          {/* ───────────────── Main Grid ───────────────── */}

          <div style={responsiveGrid}>

            {/* ───────────────── Profile Card ───────────────── */}

            <div style={styles.profileCard}>

              <input
                id="profileUpload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {

                  const selectedFile =
                    e.target.files[0];

                  if (selectedFile) {

                    setPreview(
                      URL.createObjectURL(
                        selectedFile
                      )
                    );

                    uploadInstant(selectedFile);
                  }
                }}
              />

              <div style={responsiveProfileTop}>

                {/* Avatar */}

                <div
                  style={{
                    ...responsiveAvatar,
                    cursor: photo
                      ? "pointer"
                      : "default",
                    overflow: "hidden",
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
                        objectFit: "cover",
                      }}
                    />

                  ) : (

                    initial

                  )}

                </div>

                <p style={styles.profileName}>
                  {admin?.Name ?? "—"}
                </p>

                <p style={styles.profileRole}>
                  System Administrator
                </p>

                <span style={styles.statusPill}>

                  <span style={styles.statusDot} />

                  Active

                </span>

              </div>

              {/* Profile Fields */}

              <div style={responsiveFieldList}>

                {loading ? (

                  <p style={styles.loadingText}>
                    Loading profile…
                  </p>

                ) : (

                  <>
                    <ProfileField
                      icon="user"
                      label="Full name"
                      value={admin?.Name}
                    />

                    <ProfileField
                      icon="mail"
                      label="Email"
                      value={admin?.Email}
                    />

                    <ProfileField
                      icon="phone"
                      label="Contact"
                      value={admin?.Contact}
                    />

                    <ProfileField
                      icon="map-pin"
                      label="Address"
                      value={admin?.Address}
                    />

                    <ProfileField
                      icon="shield-check"
                      label="Role"
                      value="Super Admin"
                    />
                  </>

                )}

                {/* Buttons */}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "15px",
                    flexWrap: "wrap",
                  }}
                >

                  <button
                    onClick={() =>
                      document
                        .getElementById(
                          "profileUpload"
                        )
                        .click()
                    }
                    style={{
                      padding: "8px 15px",
                      background: "#22d3ee",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "13px",
                      minHeight: "36px",
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
                        fontSize: "13px",
                        minHeight: "36px",
                      }}
                    >
                      Delete
                    </button>

                  )}

                </div>

              </div>

            </div>

            {/* ───────────────── Right Column ───────────────── */}

            <div style={styles.right}>

              {/* ───────────────── Stats ───────────────── */}

              <div style={responsiveStatsRow}>

                <StatCard
                  icon="pill"
                  iconColor="#2563eb"
                  iconBg="#eff6ff"
                  value={
                    statsLoading
                      ? "..."
                      : dashboardStats.medicines
                  }
                  label="Medicines"
                />

                <StatCard
                  icon="building-hospital"
                  iconColor="#059669"
                  iconBg="#f0fdf4"
                  value={
                    statsLoading
                      ? "..."
                      : dashboardStats.medicalStores
                  }
                  label="Medical Stores"
                />

                <StatCard
                  icon="users"
                  iconColor="#7c3aed"
                  iconBg="#f5f3ff"
                  value={
                    statsLoading
                      ? "..."
                      : dashboardStats.admins
                  }
                  label="Admins"
                />

              </div>

              {/* ───────────────── Modules ───────────────── */}

              <div style={responsiveModulesRow}>

                <ModuleCard
                  icon="pill"
                  iconColor="#2563eb"
                  iconBg="#eff6ff"
                  title="Medicines"
                  description="View, add, and manage medicine records across all stores."
                  onClick={() =>
                    navigate(
                      "/admin/medicines"
                    )
                  }
                />

                <ModuleCard
                  icon="building-hospital"
                  iconColor="#059669"
                  iconBg="#f0fdf4"
                  title="Medical Stores"
                  description="Register and monitor approved medical store listings."
                  onClick={() =>
                    navigate(
                      "/admin/stores"
                    )
                  }
                />

                <ModuleCard
                  icon="user-cog"
                  iconColor="#7c3aed"
                  iconBg="#f5f3ff"
                  title="Admins"
                  description="Add new administrators and review existing accounts."
                  onClick={() =>
                    navigate(
                      "/admin/admins"
                    )
                  }
                />

              </div>

              {/* ───────────────── Activity ───────────────── */}

              <div
                style={{
                  marginTop: "16px",
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "14px",
                  overflow: "hidden"
                }}
              >
                <div
                  style={{
                    padding: "20px",
                    borderBottom: "1px solid #e2e8f0"
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#64748b",
                      fontWeight: "600",
                      letterSpacing: "0.5px"
                    }}
                  >
                    RECENT ACTIVITY
                  </div>

                  <div
                    style={{
                      marginTop: "5px",
                      fontSize: "13px",
                      color: "#94a3b8"
                    }}
                  >
                    Latest activity from your system
                  </div>
                </div>

                {activityLoading ? (

                  <div
                    style={{
                      padding: "30px 20px",
                      textAlign: "center",
                      color: "#64748b"
                    }}
                  >
                    Loading activity...
                  </div>

                ) : recentActivity.length === 0 ? (

                  <div
                    style={{
                      padding: "30px 20px",
                      textAlign: "center",
                      color: "#64748b"
                    }}
                  >
                    No recent activity found.
                  </div>

                ) : (

                  recentActivity.map((item, index) => {

                    const activityDate = new Date(item.time);

                    return (
                      <div
                        key={`${item.type}-${item.description}-${index}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                          padding: "16px 20px",
                          borderBottom:
                            index !== recentActivity.length - 1
                              ? "1px solid #f1f5f9"
                              : "none",
                          minWidth: 0
                        }}
                      >

                        {/* Activity Icon */}

                        <div
                          style={{
                            width: "42px",
                            height: "42px",
                            minWidth: "42px",
                            borderRadius: "10px",
                            background:
                              item.type === "medicine"
                                ? "#eff6ff"
                                : item.type === "medical"
                                  ? "#f0fdf4"
                                  : "#f5f3ff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "18px"
                          }}
                        >
                          {item.type === "medicine"
                            ? "💊"
                            : item.type === "medical"
                              ? "🏥"
                              : "👨‍💼"}
                        </div>

                        {/* Activity Details */}

                        <div
                          style={{
                            flex: 1,
                            minWidth: 0
                          }}
                        >

                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#0f172a",
                              overflowWrap: "anywhere"
                            }}
                          >
                            {item.title}
                          </div>

                          <div
                            style={{
                              marginTop: "3px",
                              fontSize: "13px",
                              color: "#475569",
                              overflowWrap: "anywhere"
                            }}
                          >
                            {item.description}
                          </div>

                          <div
                            style={{
                              marginTop: "3px",
                              fontSize: "12px",
                              color: "#94a3b8",
                              overflowWrap: "anywhere"
                            }}
                          >
                            {item.user}
                          </div>

                        </div>

                        {/* Date */}

                        <div
                          style={{
                            minWidth: "100px",
                            textAlign: "right",
                            fontSize: "12px",
                            color: "#94a3b8"
                          }}
                        >
                          {activityDate.toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                          })}
                        </div>

                      </div>
                    );
                  })

                )}

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default AdminHome;

