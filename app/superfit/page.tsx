"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./superfit.module.css";

// Interface for simulator preset
interface SimulatorPreset {
  id: string;
  label: string;
  meta: string;
  transcript: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  items: { name: string; portion: string; cal: string; protein: string }[];
  json: string;
}

const SIMULATOR_PRESETS: SimulatorPreset[] = [
  {
    id: "choley-bhature",
    label: "Multilingual Food Log (Desi / Regional)",
    meta: '"Ek plate choley bhature aur ek glass sweet lassi"',
    transcript: "Ek plate choley bhature aur ek glass sweet lassi.",
    calories: "780 kcal",
    protein: "22g",
    carbs: "98g",
    fat: "34g",
    items: [
      { name: "Chole (Chickpea Curry)", portion: "1 bowl (200g)", cal: "260 kcal", protein: "12g" },
      { name: "Bhature", portion: "2 pieces", cal: "340 kcal", protein: "6g" },
      { name: "Sweet Lassi", portion: "1 glass (250ml)", cal: "180 kcal", protein: "4g" }
    ],
    json: JSON.stringify({
      "meal": "Lunch / Brunch",
      "timestamp": "01:15 PM",
      "languageDetected": "Hinglish / Hindi",
      "items": [
        { "item": "Choley (Chickpea Curry)", "portion": "1 bowl", "calories": 260, "protein": "12g", "carbs": "36g", "fat": "8g" },
        { "item": "Bhature", "portion": "2 pieces", "calories": 340, "protein": "6g", "carbs": "44g", "fat": "16g" },
        { "item": "Sweet Lassi", "portion": "1 glass (250ml)", "calories": 180, "protein": "4g", "carbs": "18g", "fat": "10g" }
      ]
    }, null, 2)
  },
  {
    id: "breakfast",
    label: "Spoken Breakfast",
    meta: '"3 scrambled eggs, oatmeal with berries & black coffee"',
    transcript: "Breakfast: three scrambled eggs, a cup of oatmeal with blueberries, and black coffee.",
    calories: "520 kcal",
    protein: "30g",
    carbs: "54g",
    fat: "18g",
    items: [
      { name: "Scrambled Eggs", portion: "3 eggs", cal: "210 kcal", protein: "18g" },
      { name: "Oatmeal with Blueberries", portion: "1 cup", cal: "308 kcal", protein: "12g" },
      { name: "Black Coffee", portion: "1 mug", cal: "2 kcal", protein: "0g" }
    ],
    json: JSON.stringify({
      "meal": "Breakfast",
      "timestamp": "08:15 AM",
      "items": [
        { "item": "Scrambled Eggs", "portion": "3 large", "calories": 210, "protein": "18g", "carbs": "1g", "fat": "15g" },
        { "item": "Oatmeal + Blueberries", "portion": "1 cup", "calories": 308, "protein": "12g", "carbs": "53g", "fat": "3g" },
        { "item": "Black Coffee", "portion": "1 mug", "calories": 2, "protein": "0g", "carbs": "0g", "fat": "0g" }
      ]
    }, null, 2)
  },
  {
    id: "lunch",
    label: "Post-Workout Lunch",
    meta: '"Grilled chicken breast, jasmine rice & steamed broccoli"',
    transcript: "Post-workout lunch: Grilled chicken breast, half cup jasmine rice, and steamed broccoli.",
    calories: "440 kcal",
    protein: "40g",
    carbs: "38g",
    fat: "6g",
    items: [
      { name: "Grilled Chicken Breast", portion: "150g", cal: "250 kcal", protein: "36g" },
      { name: "Jasmine Rice", portion: "0.5 cup", cal: "160 kcal", protein: "3g" },
      { name: "Steamed Broccoli", portion: "1 cup", cal: "30 kcal", protein: "1g" }
    ],
    json: JSON.stringify({
      "meal": "Post-Workout Lunch",
      "timestamp": "01:30 PM",
      "items": [
        { "item": "Grilled Chicken Breast", "portion": "150g", "calories": 250, "protein": "36g", "carbs": "0g", "fat": "4g" },
        { "item": "Jasmine Rice", "portion": "0.5 cup", "calories": 160, "protein": "3g", "carbs": "36g", "fat": "0.5g" },
        { "item": "Steamed Broccoli", "portion": "1 cup", "calories": 30, "protein": "1g", "carbs": "2g", "fat": "1.5g" }
      ]
    }, null, 2)
  },
  {
    id: "workout",
    label: "Spoken Workout",
    meta: '"3 sets of 12 pull-ups, 15 pushups, and 3 mile run"',
    transcript: "Completed 3 sets of 12 pull-ups, 3 sets of 15 pushups, and ran three miles in 24 minutes.",
    calories: "395 kcal burned",
    protein: "Recovery +15g",
    carbs: "Energy +30g",
    fat: "Balanced",
    items: [
      { name: "Pull-ups", portion: "3 sets × 12 reps", cal: "Calisthenics", protein: "Upper Body" },
      { name: "Pushups", portion: "3 sets × 15 reps", cal: "Bodyweight", protein: "Chest & Arms" },
      { name: "Outdoor Run", portion: "3.0 miles (24m)", cal: "330 kcal", protein: "Cardio" }
    ],
    json: JSON.stringify({
      "activity": "Full Workout Session",
      "timestamp": "07:00 AM",
      "exercises": [
        { "name": "Pull-ups", "sets": 3, "reps": 12 },
        { "name": "Pushups", "sets": 3, "reps": 15 },
        { "name": "Outdoor Run", "distance": "3.0 miles", "duration": "24 mins", "caloriesBurned": 330 }
      ]
    }, null, 2)
  }
];

export default function SuperfitLandingPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [screenshotView, setScreenshotView] = useState<"dual" | "light" | "dark">("dual");
  const [selectedPreset, setSelectedPreset] = useState<SimulatorPreset | null>(null);
  const [simulatorStatus, setSimulatorStatus] = useState<"idle" | "listening" | "parsing" | "done">("idle");
  const [typedInput, setTypedInput] = useState("");
  const [showDevJson, setShowDevJson] = useState(false);

  // Alpha Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testerEmail, setTesterEmail] = useState("");
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  const handleOpenAlphaModal = () => {
    setIsModalOpen(true);
    setModalSubmitted(false);
  };

  const handleCloseAlphaModal = () => {
    setIsModalOpen(false);
  };

  const handleAlphaSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testerEmail || !testerEmail.includes("@")) return;

    setModalSubmitting(true);
    try {
      await fetch("/api/alpha-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: testerEmail }),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setModalSubmitting(false);
      setModalSubmitted(true);
    }
  };

  const handleSelectPreset = (preset: SimulatorPreset) => {
    setSelectedPreset(preset);
    setSimulatorStatus("listening");
    setTypedInput("");

    // Simulate speech-to-text logging
    setTimeout(() => {
      setSimulatorStatus("parsing");
      // Simulate intelligent breakdown
      setTimeout(() => {
        setSimulatorStatus("done");
      }, 1000);
    }, 1200);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedInput.trim()) return;

    setSimulatorStatus("parsing");
    const mockPreset: SimulatorPreset = {
      id: "custom",
      label: "Custom Meal",
      meta: "Your custom entry",
      transcript: typedInput,
      calories: "420 kcal",
      protein: "24g",
      carbs: "48g",
      fat: "14g",
      items: [
        { name: typedInput.slice(0, 32) + (typedInput.length > 32 ? "..." : ""), portion: "1 portion", cal: "420 kcal", protein: "24g" }
      ],
      json: JSON.stringify({
        "input": typedInput,
        "language": "Natural Speech (Multilingual)",
        "estimatedCalories": 420,
        "protein": "24g",
        "carbs": "48g",
        "fat": "14g"
      }, null, 2)
    };

    setSelectedPreset(mockPreset);
    setTimeout(() => {
      setSimulatorStatus("done");
    }, 1200);
  };

  return (
    <div className={`${styles.container} ${theme === "dark" ? styles.darkTheme : ""}`}>
      {/* Ambient Mesh Glows */}
      <div className={styles.ambientLight1}></div>
      <div className={styles.ambientLight2}></div>
      <div className={styles.ambientLight3}></div>

      {/* Navigation Header */}
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <Image
            src="/superfit_logo.jpg"
            alt="Superfit Logo"
            width={40}
            height={40}
            className={styles.logoImg}
          />
          <span className={styles.logoText}>
            Super<span className={styles.logoHighlight}>fit</span>
          </span>
        </div>

        <nav className={styles.navLinks}>
          <a href="#how-it-works" className={styles.navLink}>How It Works</a>
          <a href="#comparison" className={styles.navLink}>Why Superfit</a>
          <a href="#demo" className={styles.navLink}>Live Demo</a>
          <a href="#faq" className={styles.navLink}>FAQ</a>
        </nav>

        <div className={styles.headerActions}>
          <button 
            className={styles.themeBtn} 
            onClick={toggleTheme} 
            aria-label="Toggle visual theme"
            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <button 
            onClick={handleOpenAlphaModal}
            className={styles.btnBetaHeader}
          >
            Join the Alpha
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* HERO SECTION */}
        <section className={styles.hero}>
          <div className={styles.pillBadge}>
            <span className={styles.pillDot}></span>
            <span>Multilingual AI • Google Play Closed Testing</span>
          </div>

          <h1 className={styles.heroHeadline}>
            The easiest way to stay on top of your <span className={styles.heroGradientText}>fitness goals</span>.
          </h1>

          <p className={styles.heroDescription}>
            No tedious database searching. No complex math. Just speak your meals naturally in any language — whether it's <em>"grilled chicken salad"</em> or <em>"ek plate choley bhature"</em>, Superfit understands.
          </p>

          <div className={styles.heroActions}>
            <button 
              onClick={handleOpenAlphaModal}
              className={styles.btnMainPrimary}
            >
              Join the Alpha Testing <span>→</span>
            </button>
            <a 
              href="#demo" 
              className={styles.btnMainSecondary}
            >
              🎙️ Try Multilingual Demo
            </a>
          </div>

          {/* Value Proof Ribbon */}
          <div className={styles.metricRibbon}>
            <div className={styles.metricPill}>
              <span className={styles.metricIcon}>🌐</span>
              <span className={styles.metricText}>Understands Any Language</span>
            </div>
            <div className={styles.metricPill}>
              <span className={styles.metricIcon}>⚡</span>
              <span className={styles.metricText}>3-Second Voice Logging</span>
            </div>
            <div className={styles.metricPill}>
              <span className={styles.metricIcon}>🔒</span>
              <span className={styles.metricText}>100% Private On-Device</span>
            </div>
          </div>

          {/* REAL APP DUAL PHONE SHOWCASE */}
          <div className={styles.showcaseContainer} id="how-it-works">
            <div className={styles.switcherDeck}>
              <button 
                className={`${styles.switcherBtn} ${screenshotView === "dual" ? styles.switcherBtnActive : ""}`}
                onClick={() => setScreenshotView("dual")}
              >
                Side-by-Side View
              </button>
              <button 
                className={`${styles.switcherBtn} ${screenshotView === "light" ? styles.switcherBtnActive : ""}`}
                onClick={() => setScreenshotView("light")}
              >
                Clean Light
              </button>
              <button 
                className={`${styles.switcherBtn} ${screenshotView === "dark" ? styles.switcherBtnActive : ""}`}
                onClick={() => setScreenshotView("dark")}
              >
                Midnight Pro
              </button>
            </div>

            <div className={styles.phonesStage}>
              {/* Floating Callout 1 */}
              <div className={styles.floatingBadge1}>
                <span style={{ fontSize: "1.3rem" }}>🎙️</span>
                <div>
                  <div className={styles.floatingBadgeTitle}>One-Tap Quick Log</div>
                  <div className={styles.floatingBadgeSubtitle}>Speak what you ate in any language</div>
                </div>
              </div>

              {/* Floating Callout 2 */}
              <div className={styles.floatingBadge2}>
                <span style={{ fontSize: "1.3rem" }}>📊</span>
                <div>
                  <div className={styles.floatingBadgeTitle}>Daily Nutrient Ledger</div>
                  <div className={styles.floatingBadgeSubtitle}>Live Protein, Carbs &amp; Fats</div>
                </div>
              </div>

              {/* Light Mode Real Screenshot */}
              {(screenshotView === "dual" || screenshotView === "light") && (
                <div className={`${styles.phoneHardware} ${styles.phoneLeft}`}>
                  <div className={styles.phoneBezel}>
                    <Image
                      src="/superfit_screen_light.jpg"
                      alt="Superfit Light Mode App Screenshot"
                      width={540}
                      height={1170}
                      className={styles.phoneImg}
                      priority
                    />
                  </div>
                  <div className={styles.phoneTag}>
                    <span>☀️</span> Clean Light Interface
                  </div>
                </div>
              )}

              {/* Dark Mode Real Screenshot */}
              {(screenshotView === "dual" || screenshotView === "dark") && (
                <div className={`${styles.phoneHardware} ${styles.phoneRight}`}>
                  <div className={styles.phoneBezel}>
                    <Image
                      src="/superfit_screen_dark.jpg"
                      alt="Superfit Dark Mode App Screenshot"
                      width={540}
                      height={1170}
                      className={styles.phoneImg}
                      priority
                    />
                  </div>
                  <div className={styles.phoneTag}>
                    <span>🌙</span> Midnight Dark Interface
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* COMPARISON SECTION: THE OLD WAY VS SUPERFIT */}
        <section className={styles.comparisonSection} id="comparison">
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionEyebrow}>Effortless By Design</span>
            <h2 className={styles.sectionTitle}>Stop fighting your fitness tracker.</h2>
            <p className={styles.sectionSubtitle}>
              Traditional calorie apps make consistency feel like a full-time job. Superfit makes it as simple as speaking a sentence in whatever language you use.
            </p>
          </div>

          <div className={styles.comparisonGrid}>
            {/* The Old Way */}
            <div className={styles.compCardOld}>
              <span className={`${styles.compBadge} ${styles.compBadgeOld}`}>Traditional Fitness Apps</span>
              <h3 className={styles.compTitle}>Tedious &amp; Rigid</h3>
              <div className={styles.compList}>
                <div className={styles.compItem}>
                  <span className={styles.compIconBad}>✕</span>
                  <span>Search through 10,000 confusing food database entries for every meal</span>
                </div>
                <div className={styles.compItem}>
                  <span className={styles.compIconBad}>✕</span>
                  <span>Doesn't understand regional dishes, homemade food, or mixed languages</span>
                </div>
                <div className={styles.compItem}>
                  <span className={styles.compIconBad}>✕</span>
                  <span>Rigid, static calorie goals that ignore bad sleep, fatigue, or workouts</span>
                </div>
                <div className={styles.compItem}>
                  <span className={styles.compIconBad}>✕</span>
                  <span>Your private health telemetry uploaded to third-party ad networks</span>
                </div>
              </div>
            </div>

            {/* The Superfit Way */}
            <div className={styles.compCardSuperfit}>
              <span className={`${styles.compBadge} ${styles.compBadgeNew}`}>The Superfit Way</span>
              <h3 className={styles.compTitle}>Effortless &amp; Multilingual</h3>
              <div className={styles.compList}>
                <div className={styles.compItem}>
                  <span className={styles.compIconGood}>✓</span>
                  <span><strong>Speak in any language:</strong> From "avocado toast" to "ek plate choley bhature", it understands in 3 seconds</span>
                </div>
                <div className={styles.compItem}>
                  <span className={styles.compIconGood}>✓</span>
                  <span><strong>Instant Macro Breakdown:</strong> Automatically calculates exact calories, protein, carbs, and fats</span>
                </div>
                <div className={styles.compItem}>
                  <span className={styles.compIconGood}>✓</span>
                  <span><strong>Adaptive Targets:</strong> Goals automatically adjust when you sleep poorly or workout hard</span>
                </div>
                <div className={styles.compItem}>
                  <span className={styles.compIconGood}>✓</span>
                  <span><strong>100% Private:</strong> Your wellness data stays encrypted locally on your phone</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE VOICE SIMULATOR SECTION */}
        <section id="demo" className={styles.simulatorSection}>
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionEyebrow}>Live Interactive Demo</span>
            <h2 className={styles.sectionTitle}>Experience natural multilingual logging.</h2>
            <p className={styles.sectionSubtitle}>
              Tap a meal below or type what you ate today in any language. Watch Superfit break down the nutrients in real time.
            </p>
          </div>

          <div className={styles.simulatorDeck}>
            {/* Left Controls */}
            <div className={styles.simControls}>
              <div className={styles.simPromptLabel}>Choose a sample voice log:</div>
              <div className={styles.simPresetList}>
                {SIMULATOR_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`${styles.presetCard} ${
                      selectedPreset?.id === preset.id ? styles.presetCardActive : ""
                    }`}
                  >
                    <div className={styles.micBubble}>🎙️</div>
                    <div>
                      <div className={styles.presetTitle}>{preset.label}</div>
                      <div className={styles.presetMeta}>{preset.meta}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom Input */}
              <div style={{ marginTop: "0.75rem" }}>
                <div className={styles.simPromptLabel} style={{ marginBottom: "0.5rem" }}>Or type a meal in your language:</div>
                <form onSubmit={handleCustomSubmit} className={styles.customInputForm}>
                  <input
                    type="text"
                    value={typedInput}
                    onChange={(e) => setTypedInput(e.target.value)}
                    placeholder="e.g. 2 roti with dal tadka and paneer bhurji, or 1 bowl biryani"
                    className={styles.customTextInput}
                  />
                  <button type="submit" className={styles.customSubmitBtn}>
                    Log
                  </button>
                </form>
              </div>

              {/* Live Waveform when listening */}
              {simulatorStatus === "listening" && (
                <div className={styles.waveformContainer}>
                  <div style={{ fontSize: "0.82rem", color: "var(--accent-cyan)", fontWeight: "800" }}>LISTENING</div>
                  <div className={styles.waveformBars}>
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div key={i} className={`${styles.bar} ${styles.barActive}`}></div>
                    ))}
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: "600" }}>0:02</div>
                </div>
              )}
            </div>

            {/* Right Screen Output */}
            <div className={styles.simScreen}>
              <div className={styles.simScreenHeader}>
                <span className={styles.simScreenTag}>⚡ Instant AI Breakdown</span>
                <div className={styles.simStatusTag}>
                  {simulatorStatus === "listening" && (
                    <>
                      <span style={{ color: "#38bdf8" }}>Listening to speech...</span>
                    </>
                  )}
                  {simulatorStatus === "parsing" && (
                    <>
                      <span style={{ color: "#fbbf24" }}>Parsing meal &amp; portion sizes...</span>
                    </>
                  )}
                  {simulatorStatus === "done" && (
                    <>
                      <span style={{ color: "#34d399" }}>✓ Calculated</span>
                    </>
                  )}
                  {simulatorStatus === "idle" && (
                    <>
                      <span style={{ color: "#94a3b8" }}>Ready</span>
                    </>
                  )}
                </div>
              </div>

              {simulatorStatus === "idle" ? (
                <div className={styles.simStateEmpty}>
                  <div style={{ fontSize: "3.5rem" }}>🎙️</div>
                  <h3 style={{ color: "#f8fafc", fontSize: "1.3rem", fontWeight: 700 }}>Try a Sample Above</h3>
                  <p>Pick one of the voice examples like <em>"Ek plate choley bhature"</em> or type any meal in your language to see instant nutrient breakdown.</p>
                </div>
              ) : simulatorStatus === "listening" ? (
                <div className={styles.simStateEmpty}>
                  <div style={{ fontSize: "3.5rem" }}>⚡</div>
                  <h3 style={{ color: "#f8fafc", fontSize: "1.3rem", fontWeight: 700 }}>Listening to voice...</h3>
                  <p>Transcribing natural speech across languages...</p>
                </div>
              ) : (
                <div className={styles.simStateActive}>
                  <div>
                    <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#94a3b8", fontWeight: "bold", marginBottom: "0.35rem" }}>What you said:</div>
                    <div className={styles.simTranscriptBubble}>
                      "{selectedPreset?.transcript}"
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#94a3b8", fontWeight: "bold", marginBottom: "0.5rem" }}>Daily Nutrients Added:</div>
                    <div className={styles.macroPillGrid}>
                      <div className={styles.macroPillCard}>
                        <div className={styles.macroPillValue} style={{ color: "#38bdf8" }}>
                          {selectedPreset?.calories}
                        </div>
                        <div className={styles.macroPillLabel}>Calories</div>
                      </div>
                      <div className={styles.macroPillCard}>
                        <div className={styles.macroPillValue} style={{ color: "#34d399" }}>
                          {selectedPreset?.protein}
                        </div>
                        <div className={styles.macroPillLabel}>Protein</div>
                      </div>
                      <div className={styles.macroPillCard}>
                        <div className={styles.macroPillValue} style={{ color: "#fbbf24" }}>
                          {selectedPreset?.carbs}
                        </div>
                        <div className={styles.macroPillLabel}>Carbs</div>
                      </div>
                      <div className={styles.macroPillCard}>
                        <div className={styles.macroPillValue} style={{ color: "#f472b6" }}>
                          {selectedPreset?.fat}
                        </div>
                        <div className={styles.macroPillLabel}>Fats</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#94a3b8", fontWeight: "bold", marginBottom: "0.35rem" }}>Recognized Items &amp; Portions:</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      {selectedPreset?.items.map((item, idx) => (
                        <div key={idx} style={{ 
                          display: "flex", 
                          justifyContent: "space-between", 
                          background: "rgba(255,255,255,0.05)", 
                          padding: "0.5rem 0.85rem", 
                          borderRadius: "10px",
                          fontSize: "0.85rem"
                        }}>
                          <span><strong>{item.name}</strong> <span style={{ color: "#94a3b8" }}>({item.portion})</span></span>
                          <span style={{ color: "#38bdf8", fontWeight: "bold" }}>{item.cal}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: "0.25rem" }}>
                    <button 
                      onClick={() => setShowDevJson(!showDevJson)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#94a3b8",
                        fontSize: "0.75rem",
                        cursor: "pointer",
                        textDecoration: "underline",
                        padding: 0
                      }}
                    >
                      {showDevJson ? "Hide technical output ▲" : "View raw output data ▼"}
                    </button>
                    {showDevJson && (
                      <div style={{ 
                        background: "rgba(0,0,0,0.5)", 
                        padding: "0.75rem", 
                        borderRadius: "10px", 
                        marginTop: "0.5rem",
                        maxHeight: "120px",
                        overflowY: "auto",
                        fontFamily: "monospace",
                        fontSize: "0.75rem",
                        color: "#7dd3fc"
                      }}>
                        <pre style={{ whiteSpace: "pre-wrap" }}><code>{selectedPreset?.json}</code></pre>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ASYMMETRIC BENTO GRID FEATURES */}
        <section className={styles.bentoSection}>
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionEyebrow}>Engineered For Consistency</span>
            <h2 className={styles.sectionTitle}>Everything you need to succeed.</h2>
            <p className={styles.sectionSubtitle}>
              Smart features that run quietly in the background so you can focus on living your life.
            </p>
          </div>

          <div className={styles.bentoGrid}>
            {/* Bento Card 1 (Large - Multilingual) */}
            <div className={`${styles.bentoCard} ${styles.bentoCardLarge}`}>
              <div>
                <div className={styles.bentoIconWrapper}>🌐</div>
                <h3 className={styles.bentoCardTitle}>Talk in your natural language.</h3>
                <p className={styles.bentoCardDesc}>
                  Whether you describe your meal in English, Hindi, Hinglish, or regional terms, Superfit understands your everyday cooking. No robotic phrases or rigid item searches required.
                </p>
              </div>
              <div style={{ 
                marginTop: "1.5rem", 
                padding: "1rem 1.25rem", 
                background: "var(--bg-subtle)", 
                borderRadius: "14px", 
                fontSize: "0.88rem",
                color: "var(--text-secondary)",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
                <span>✨</span> "Do roti, ek katori dal tadka aur thoda paneer bhurji" ➔ <strong>520 kcal • 26g Protein</strong>
              </div>
            </div>

            {/* Bento Card 2 */}
            <div className={styles.bentoCard}>
              <div>
                <div className={styles.bentoIconWrapper}>🛌</div>
                <h3 className={styles.bentoCardTitle}>Adapts when life happens.</h3>
                <p className={styles.bentoCardDesc}>
                  Had a rough night of sleep or crushed a heavy workout? Superfit automatically shifts your protein targets to protect your muscles and recovery.
                </p>
              </div>
              <div style={{ 
                marginTop: "1.5rem", 
                padding: "0.85rem 1rem", 
                background: "rgba(16, 185, 129, 0.1)", 
                borderRadius: "12px", 
                fontSize: "0.82rem",
                color: "var(--accent-emerald)",
                fontWeight: 700
              }}>
                Sleep Score 88% ➔ Protein Adjusted to 132g
              </div>
            </div>

            {/* Bento Card 3 */}
            <div className={styles.bentoCard}>
              <div>
                <div className={styles.bentoIconWrapper}>👟</div>
                <h3 className={styles.bentoCardTitle}>Zero-friction step sync.</h3>
                <p className={styles.bentoCardDesc}>
                  Connects directly to Android Health Connect to pull your daily steps, active calorie burn, and sleep telemetry seamlessly with zero manual input required.
                </p>
              </div>
            </div>

            {/* Bento Card 4 */}
            <div className={styles.bentoCard}>
              <div>
                <div className={styles.bentoIconWrapper}>🔒</div>
                <h3 className={styles.bentoCardTitle}>100% Private on-device.</h3>
                <p className={styles.bentoCardDesc}>
                  Your health records belong to you. Raw biometrics, sleep sessions, and meal history remain encrypted locally on your Android device. Zero cloud snooping.
                </p>
              </div>
            </div>

            {/* Bento Card 5 */}
            <div className={styles.bentoCard}>
              <div>
                <div className={styles.bentoIconWrapper}>⏰</div>
                <h3 className={styles.bentoCardTitle}>Helpful gentle check-ins.</h3>
                <p className={styles.bentoCardDesc}>
                  Under-logged late in the evening? Get friendly reminders with one-tap voice input buttons right on your lock screen notification.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section id="faq" className={styles.faqSection}>
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionEyebrow}>Common Questions</span>
            <h2 className={styles.sectionTitle}>Everything you need to know.</h2>
            <p className={styles.sectionSubtitle}>Simple answers to common questions about Superfit.</p>
          </div>

          <div className={styles.faqDeck}>
            <details name="faq" className={styles.faqBox}>
              <summary className={styles.faqQuestion}>How do I join the Google Play Alpha Testing?</summary>
              <div className={styles.faqAnswer}>
                Because Superfit is currently in Google Play Closed Alpha Testing, Google requires your Google Play email address to be allowlisted before the Play Store download link activates. Simply tap any "Join the Alpha" button on this page, enter your Google Play email, and we'll grant you access immediately.
              </div>
            </details>

            <details name="faq" className={styles.faqBox}>
              <summary className={styles.faqQuestion}>Can I speak in Hindi, Hinglish, or other languages?</summary>
              <div className={styles.faqAnswer}>
                Yes! Superfit understands natural everyday speech across languages and mixed dialects. Whether you say "two boiled eggs and toast" or "ek plate choley bhature aur ek glass lassi", Superfit automatically detects the meal, portions, and computes your calories and macronutrients instantly.
              </div>
            </details>

            <details name="faq" className={styles.faqBox}>
              <summary className={styles.faqQuestion}>Is my health and fitness data private?</summary>
              <div className={styles.faqAnswer}>
                Yes, 100%. Superfit stores your steps, sleep records, and meal logs locally on your phone. We do not sell your personal information or track you across websites. You are always in full control of your data.
              </div>
            </details>

            <details name="faq" className={styles.faqBox}>
              <summary className={styles.faqQuestion}>What happens when the app goes public? Do I need to reinstall?</summary>
              <div className={styles.faqAnswer}>
                No reinstallation needed! When Superfit launches publicly on Google Play, your alpha build will seamlessly update to the production release through Google Play Store. All your local meal history, goals, and settings will remain completely intact.
              </div>
            </details>
          </div>
        </section>

        {/* BOTTOM CALL TO ACTION */}
        <section className={styles.bottomCtaDeck}>
          <h2 className={styles.bottomCtaTitle}>Ready to hit your fitness goals?</h2>
          <p className={styles.bottomCtaSubtitle}>
            Join our closed Google Play alpha testing and start tracking your meals and workouts in seconds.
          </p>
          <div style={{ display: "flex", gap: "1.25rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button 
              onClick={handleOpenAlphaModal}
              className={styles.btnMainPrimary}
            >
              Join the Alpha Testing <span>→</span>
            </button>
            <a 
              href="https://github.com/neetishtewari/superfit" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.btnMainSecondary}
            >
              View on GitHub
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          <Image
            src="/superfit_logo.jpg"
            alt="Superfit Logo"
            width={32}
            height={32}
            className={styles.logoImg}
          />
          <span className={styles.logoText} style={{ fontSize: "1.2rem" }}>
            Super<span className={styles.logoHighlight}>fit</span>
          </span>
        </div>
        <p className={styles.footerCopy}>© {new Date().getFullYear()} Neetish Tewari. The effortless AI fitness companion.</p>
        <div className={styles.footerNav}>
          <a href="https://github.com/neetishtewari/superfit" className={styles.footerNavLink}>GitHub</a>
          <a href="/" className={styles.footerNavLink}>Portfolio</a>
          <a href="/contact" className={styles.footerNavLink}>Contact</a>
        </div>
      </footer>

      {/* =========================================================================
         GOOGLE PLAY ALPHA TESTER ACCESS MODAL
         ========================================================================= */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseAlphaModal}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.modalCloseBtn} 
              onClick={handleCloseAlphaModal}
              aria-label="Close dialog"
            >
              ✕
            </button>

            {!modalSubmitted ? (
              <>
                <span className={styles.modalBadge}>🤖 Google Play Alpha Access</span>
                <h3 className={styles.modalTitle}>Join the Closed Alpha</h3>
                <p className={styles.modalDesc}>
                  Google Play closed testing requires your Google account email to be allowlisted before the Play Store download link becomes active.
                </p>

                <form onSubmit={handleAlphaSignup} className={styles.modalForm}>
                  <input
                    type="email"
                    required
                    value={testerEmail}
                    onChange={(e) => setTesterEmail(e.target.value)}
                    placeholder="Enter your Google Play email (e.g. name@gmail.com)"
                    className={styles.modalInput}
                    autoFocus
                  />
                  <button 
                    type="submit" 
                    disabled={modalSubmitting}
                    className={styles.modalSubmitBtn}
                  >
                    {modalSubmitting ? "Requesting Access..." : "Grant Alpha Access →"}
                  </button>
                </form>
                <div style={{ marginTop: "1rem", fontSize: "0.78rem", color: "var(--text-muted)", textAlign: "center" }}>
                  🔒 We only use this email to enable your Google Play testing track.
                </div>
              </>
            ) : (
              <div className={styles.modalSuccess}>
                <div className={styles.modalSuccessIcon}>✓</div>
                <h3 className={styles.modalTitle} style={{ marginBottom: "0.25rem" }}>You're on the list!</h3>
                <p className={styles.modalDesc} style={{ marginBottom: "1rem" }}>
                  We've registered <strong>{testerEmail}</strong>. Your Google account is being added to the Google Play Closed Testing track.
                </p>
                <a 
                  href="https://play.google.com/store/apps/details?id=com.superfit.aifitness" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.playStoreDirectBtn}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186c-.194-.202-.31-.497-.31-.836V2.65c0-.339.116-.634.31-.836zM15.207 13.414l2.122 2.121-12.016 6.94 9.894-9.061zm0-2.828L5.313 1.525l12.016 6.94-2.122 2.121zm1.414 1.414l3.772 2.18c.683.395.683 1.042 0 1.437l-3.772 2.18-2.121-2.121 2.121-2.121z"/>
                  </svg>
                  Open in Google Play Store ↗
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
