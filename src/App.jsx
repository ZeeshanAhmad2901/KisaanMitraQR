import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  Database,
  GitBranch,
  Layers3,
  LockKeyhole,
  Menu,
  Network,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  X,
  Zap,
} from "lucide-react";

import "./App.css";

const farmerImage =
  "https://images.pexels.com/photos/29858623/pexels-photo-29858623.jpeg?cs=srgb&dl=pexels-vishal-mali-2147823479-29858623.jpg&fm=jpg";

const navItems = [
  ["Overview", "overview"],
  ["Architecture", "architecture"],
  ["Workflow", "workflow"],
  ["Adoption", "adoption"],
  ["Modules", "modules"],
  ["Security", "security"],
  ["Risks", "risks"],
  ["Innovation", "innovation"],
  ["AI Intelligence", "ai"],
  ["Scalability", "scalability"],
  ["Roadmap", "roadmap"],
  ["Tech Stack", "tech"],
];

const architectureNodes = [
  {
    id: "users",
    title: "Users",
    subtitle: "Farmer • Operator • Admin",
    icon: Users,
    color: "green",
    description:
      "The human layer. Different roles interact with the platform through purpose-built workflows.",
    details: [
      "Farmer discovers centres and books procurement slots.",
      "Operator manages arrivals, capacity and queue progression.",
      "Admin monitors multiple centres and system-level activity.",
    ],
  },
  {
    id: "client",
    title: "Client Layer",
    subtitle: "React + TypeScript",
    icon: Smartphone,
    color: "blue",
    description:
      "Responsive interfaces provide role-specific experiences while keeping the core workflow consistent.",
    details: [
      "React + TypeScript frontend",
      "Vite build system",
      "Tailwind / reusable UI system",
      "React Router for navigation",
      "Zustand for client-side state",
      "i18n-ready multilingual interface",
    ],
  },
  {
    id: "api",
    title: "Application / API",
    subtitle: "FastAPI • REST",
    icon: Server,
    color: "purple",
    description:
      "The application layer will coordinate business rules and expose controlled APIs to the client.",
    details: [
      "Authentication & authorization",
      "Booking APIs",
      "Queue APIs",
      "Procurement APIs",
      "Centre management",
      "Notifications",
      "Analytics",
    ],
  },
  {
    id: "data",
    title: "Data Layer",
    subtitle: "PostgreSQL / MySQL",
    icon: Database,
    color: "orange",
    description:
      "Structured operational data supports bookings, queue state, procurement status and auditability.",
    details: [
      "Users",
      "Centres",
      "Slots",
      "Bookings",
      "Queue records",
      "Procurement records",
      "Notifications",
      "Audit records",
    ],
  },
  {
    id: "intelligence",
    title: "Intelligence Layer",
    subtitle: "Future AI / Analytics",
    icon: BrainCircuit,
    color: "pink",
    description:
      "A future intelligence layer can convert operational data into predictions and recommendations.",
    details: [
      "Waiting-time prediction",
      "Centre load prediction",
      "Demand forecasting",
      "Smart slot recommendation",
      "Anomaly detection",
    ],
  },
];

const workflow = [
  "Registration",
  "Centre Selection",
  "Slot Discovery",
  "Slot Booking",
  "Confirmation",
  "Arrival",
  "Queue",
  "Procurement",
  "Status Update",
  "Completion",
];

const workflowDetails = [
  [
    "Registration",
    "Identity + profile setup",
    "Create a farmer profile and establish the minimum information required for procurement coordination.",
  ],
  [
    "Centre Selection",
    "Choose procurement centre",
    "Select the relevant centre based on availability, operating configuration and farmer preference.",
  ],
  [
    "Slot Discovery",
    "Read live availability",
    "Expose available dates, time windows and remaining capacity instead of forcing the farmer to guess.",
  ],
  [
    "Slot Booking",
    "Reserve capacity",
    "Validate the request, check capacity and prevent conflicting or duplicate bookings before creating the reservation.",
  ],
  [
    "Confirmation",
    "Return booking reference",
    "Show the confirmed slot and the information the farmer needs for the procurement visit.",
  ],
  [
    "Arrival",
    "Mark presence",
    "The operator records arrival so the booking can enter the operational queue.",
  ],
  [
    "Queue",
    "Track position / state",
    "Move the farmer through explicit queue states and expose meaningful progress.",
  ],
  [
    "Procurement",
    "Process the transaction",
    "The centre operator handles procurement and updates the operational state.",
  ],
  [
    "Status Update",
    "Persist the latest state",
    "Controlled state transitions keep farmer-facing information aligned with operator actions.",
  ],
  [
    "Completion",
    "Close the journey",
    "Mark procurement complete and expose the final completion/payment visibility when available.",
  ],
];

const queueStates = [
  ["WAITING", "Farmer has arrived and is waiting.", "blue"],
  ["CALLED", "Farmer has been called to the processing counter.", "purple"],
  ["PROCESSING", "Procurement activity is currently underway.", "orange"],
  ["COMPLETED", "Procurement workflow has completed.", "green"],
];

const aiCards = [
  {
    title: "Waiting-Time Prediction",
    input: "Queue size + processing time + arrivals",
    output: "Estimated waiting time",
    user: "Farmer / Operator",
  },
  {
    title: "Centre Load Prediction",
    input: "Bookings + historical demand + seasonality",
    output: "Expected centre load",
    user: "Operator / Admin",
  },
  {
    title: "Smart Slot Recommendation",
    input: "Availability + capacity + farmer preference",
    output: "Recommended slot",
    user: "Farmer",
  },
  {
    title: "Anomaly Detection",
    input: "Operational patterns + booking behaviour",
    output: "Potential anomaly",
    user: "Admin",
  },
];

const risks = [
  {
    risk: "Poor Connectivity",
    problem: "Farmers may have unstable or low-bandwidth connections.",
    mitigation:
      "Lightweight responsive screens, retry handling and future offline-first support.",
  },
  {
    risk: "Concurrent Booking",
    problem:
      "Two farmers may attempt to claim the final available slot simultaneously.",
    mitigation:
      "Server-side capacity validation, database constraints and transaction-safe booking.",
  },
  {
    risk: "Booking Surge",
    problem:
      "A popular centre may receive a large number of requests at once.",
    mitigation:
      "API protection, queue-based processing and scalable backend infrastructure.",
  },
  {
    risk: "Incorrect Operator Update",
    problem: "Wrong status data could mislead farmers.",
    mitigation:
      "Role permissions, validation, audit logs and controlled state transitions.",
  },
  {
    risk: "AI Prediction Error",
    problem:
      "Predictions can become unreliable with poor or changing data.",
    mitigation:
      "Confidence checks, fallback rules, monitoring and human oversight.",
  },
];

function scrollToId(id) {
  const target = document.getElementById(id);
  if (!target) return;

  const navbar = document.querySelector(".navbar");
  const judgeStrip = document.querySelector(".judge-strip");
  const navbarHeight = navbar?.getBoundingClientRect().height || 0;
  const judgeHeight = judgeStrip?.getBoundingClientRect().height || 0;
  const extraGap = 18;

  const targetTop =
    target.getBoundingClientRect().top +
    window.scrollY -
    navbarHeight -
    judgeHeight -
    extraGap;

  window.scrollTo({
    top: Math.max(0, targetTop),
    behavior: "smooth",
  });
}

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="section-header">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function StatusPill({ children, type }) {
  return <span className={`status-pill ${type}`}>{children}</span>;
}

function ArchitectureDiagram({ future }) {
  const [selected, setSelected] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [running, setRunning] = useState(false);

  const flowIds = future
    ? ["users", "client", "api", "data", "intelligence"]
    : ["users", "client", "api", "data"];

  useEffect(() => {
    if (!running) return;

    let index = 0;
    setActiveId(flowIds[0]);

    const timer = window.setInterval(() => {
      index += 1;

      if (index >= flowIds.length) {
        window.clearInterval(timer);
        setRunning(false);
        setActiveId(null);
        return;
      }

      setActiveId(flowIds[index]);
    }, 850);

    return () => window.clearInterval(timer);
  }, [running, future]);

  const nodeById = Object.fromEntries(
    architectureNodes.map((node) => [node.id, node])
  );

  const inspect = (id) => {
    setSelected(nodeById[id]);
    setActiveId(id);
  };

  return (
    <div className="architecture-wrapper">
      <div className="architecture-toolbar">
        <div>
          <span className="eyebrow">INTERACTIVE SYSTEM MAP</span>
          <p>
            Click a layer to inspect it, or run a request through the stack.
          </p>
        </div>

        <button
          className={`run-flow-button ${running ? "running" : ""}`}
          onClick={() => {
            setSelected(null);
            setRunning(false);
            window.setTimeout(() => setRunning(true), 30);
          }}
          disabled={running}
        >
          <Zap size={16} />
          {running ? "Flow Running…" : "Run Request Flow"}
        </button>
      </div>

      <div className="architecture-diagram">
        <div className="architecture-row">
          <button
            className={`arch-node user-node ${
              activeId === "users" ? "active" : ""
            }`}
            onClick={() => inspect("users")}
          >
            <Users size={22} />
            <strong>Users</strong>
            <small>Farmer • Operator • Admin</small>
          </button>
        </div>

        <div
          className={`diagram-arrow ${
            activeId === "client" ? "active" : ""
          }`}
        >
          <ArrowDown size={22} />
          <span>request / interaction</span>
        </div>

        <div className="architecture-row">
          {["client", "api", "data"].map((id) => {
            const node = nodeById[id];
            const Icon = node.icon;

            return (
              <button
                className={`arch-node ${activeId === id ? "active" : ""}`}
                key={id}
                onClick={() => inspect(id)}
              >
                <Icon size={22} />
                <strong>{node.title}</strong>
                <small>{node.subtitle}</small>
              </button>
            );
          })}
        </div>

        <div
          className={`diagram-arrow ${
            activeId === "intelligence" ? "active" : ""
          }`}
        >
          <ArrowDown size={22} />
          <span>
            {future
              ? "feeds intelligence"
              : "feeds analytics / future intelligence"}
          </span>
        </div>

        <div className="architecture-row">
          <button
            className={`arch-node intelligence-node ${
              activeId === "intelligence" ? "active" : ""
            } ${!future ? "future-dimmed" : ""}`}
            onClick={() => inspect("intelligence")}
          >
            <BrainCircuit size={22} />
            <strong>Future Intelligence</strong>
            <small>Prediction • Forecasting • Recommendations</small>
            {!future && <em>FUTURE</em>}
          </button>
        </div>

        <div className="architecture-flow-status">
          <span className={`flow-led ${running ? "on" : ""}`} />
          <span>
            {running
              ? `Processing through ${
                  nodeById[activeId]?.title || "system"
                }`
              : "Ready — click a layer or run the simulated request"}
          </span>
        </div>

        <div className="diagram-caption">
          <span className="line-dot" />
          The animation represents a logical request path, not network latency.
        </div>
      </div>

      {selected && (
        <motion.div
          className="node-panel"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <button className="close-panel" onClick={() => setSelected(null)}>
            <X size={18} />
          </button>

          <div className="panel-icon">
            <selected.icon size={24} />
          </div>

          <span className="eyebrow">SYSTEM COMPONENT</span>
          <h3>{selected.title}</h3>
          <p>{selected.description}</p>

          <div className="panel-details">
            {selected.details.map((detail) => (
              <div key={detail}>
                <CheckCircle2 size={16} />
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

function WorkflowDiagram() {
  const [selectedStep, setSelectedStep] = useState(0);

  return (
    <div className="workflow-interactive">
      <div className="workflow-container">
        {workflow.map((item, index) => (
          <div className="workflow-item" key={item}>
            <div
              className={`workflow-number ${
                selectedStep === index ? "active" : ""
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </div>

            <button
              className={`workflow-card ${
                selectedStep === index ? "active" : ""
              }`}
              onClick={() => setSelectedStep(index)}
            >
              <span>{index < 5 ? "FARMER FLOW" : "OPERATIONS FLOW"}</span>
              <strong>{item}</strong>
              <ChevronDown size={15} />
            </button>

            {index !== workflow.length - 1 && (
              <ArrowRight className="workflow-arrow" size={18} />
            )}
          </div>
        ))}
      </div>

      <motion.div
        className="workflow-detail-card"
        key={selectedStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="workflow-detail-index">
          {String(selectedStep + 1).padStart(2, "0")}
        </div>

        <div>
          <span>{workflowDetails[selectedStep][1]}</span>
          <h3>{workflowDetails[selectedStep][0]}</h3>
          <p>{workflowDetails[selectedStep][2]}</p>
        </div>

        <div className="workflow-detail-state">
          <span>STATE</span>
          <strong>
            {selectedStep < 5
              ? "FARMER JOURNEY"
              : selectedStep < 9
              ? "OPERATIONS"
              : "COMPLETION"}
          </strong>
        </div>
      </motion.div>
    </div>
  );
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [judgeMode, setJudgeMode] = useState(false);
  const [architectureFuture, setArchitectureFuture] = useState(false);
  const [queueRunning, setQueueRunning] = useState(false);
  const [queueIndex, setQueueIndex] = useState(0);

  const go = (id) => {
    setMobileOpen(false);
    scrollToId(id);
  };

  const runQueueSimulation = () => {
    if (queueRunning) return;

    setQueueRunning(true);
    setQueueIndex(0);

    let index = 0;

    const timer = window.setInterval(() => {
      index += 1;
      setQueueIndex(index);

      if (index >= queueStates.length - 1) {
        window.clearInterval(timer);

        window.setTimeout(() => setQueueRunning(false), 900);
      }
    }, 900);
  };

  return (
    <div className="app">
      <div className="noise" />

      {/* NAVIGATION */}
      <header className="navbar">
        <div className="nav-inner">
          <button className="brand" onClick={() => go("overview")}>
            <span className="brand-mark">KM</span>

            <span>
              <strong>KISAAN MITRA</strong>
              <small>TECHNICAL DEEP DIVE</small>
            </span>
          </button>

          <nav
            className={
              mobileOpen ? "nav-links mobile-open" : "nav-links"
            }
          >
            {navItems.map(([label, id]) => (
              <button key={id} onClick={() => go(id)}>
                {label}
              </button>
            ))}
          </nav>

          <button
            className={`judge-button ${judgeMode ? "active" : ""}`}
            onClick={() => setJudgeMode(!judgeMode)}
          >
            <Sparkles size={15} />
            Judge Mode
          </button>

          <button
            className="mobile-menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* JUDGE MODE */}
      {judgeMode && (
        <div className="judge-strip">
          <div>
            <Sparkles size={16} />
            <strong>JUDGE MODE</strong>
            <span>Jump directly to the technical answer.</span>
          </div>

          <div className="judge-actions">
            {[
              ["How does it work?", "architecture"],
              ["How is the farmer adoption handled?", "adoption"],
              ["How is it secured?", "security"],
              ["What happens if it fails?", "risks"],
              ["Can it scale?", "scalability"],
              ["Where does AI fit?", "ai"],
              ["What is implemented?", "tech"],
            ].map(([label, id]) => (
              <button key={id} onClick={() => go(id)}>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* HERO */}
      <main>
        <section id="overview" className="hero section">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="top-label">
                <span className="pulse" />
                SIH 2026 • PS 26032
              </div>

              <h1>
                From unpredictable queues
                <span> to predictable procurement.</span>
              </h1>

              <p className="hero-description">
                A technical deep dive into Kisaan Mitra — a modular digital
                coordination layer connecting farmers, procurement centres,
                queue operations and future intelligence.
              </p>

              <div className="hero-actions">
                <button
                  className="primary-button"
                  onClick={() => go("architecture")}
                >
                  Explore Architecture
                  <ArrowRight size={18} />
                </button>

                <button
                  className="secondary-button"
                  onClick={() => go("workflow")}
                >
                  End-to-End Flow
                  <ArrowDown size={17} />
                </button>
              </div>

              <div className="status-row">
                <StatusPill type="implemented">
                  ● IMPLEMENTED
                </StatusPill>

                <StatusPill type="planned">
                  ● PLANNED
                </StatusPill>

                <StatusPill type="future">
                  ● FUTURE
                </StatusPill>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-photo">
                <img
                  src={farmerImage}
                  alt="Farmer using a smartphone in a field"
                />

                <div className="photo-overlay" />

                <div className="photo-label">
                  <span>REAL-WORLD CONTEXT</span>
                  <strong>Farmer → Digital Coordination</strong>
                </div>
              </div>

              <div className="floating-card card-one">
                <Zap size={17} />

                <div>
                  <small>CORE OBJECTIVE</small>
                  <strong>Reduce uncertainty</strong>
                </div>
              </div>

              <div className="floating-card card-two">
                <Network size={17} />

                <div>
                  <small>ARCHITECTURE</small>
                  <strong>Modular & scalable</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* QUICK CARDS */}
        <section className="quick-section">
          <div className="quick-grid">
            {[
              [
                Layers3,
                "End-to-End Architecture",
                "Understand how users, frontend, APIs, data and intelligence connect.",
              ],
              [
                GitBranch,
                "Procurement Workflow",
                "Follow the farmer journey from registration to completion.",
              ],
              [
                ShieldCheck,
                "Security & Resilience",
                "Explore RBAC, validation, failure handling and auditability.",
              ],
              [
                BrainCircuit,
                "Future Intelligence",
                "See where prediction, forecasting and recommendations fit.",
              ],
            ].map(([Icon, title, description]) => (
              <motion.div
                className="quick-card"
                key={title}
                whileHover={{ y: -6 }}
              >
                <div className="quick-icon">
                  <Icon size={21} />
                </div>

                <h3>{title}</h3>
                <p>{description}</p>
                <ArrowUpRight size={18} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ARCHITECTURE */}
        <section id="architecture" className="section dark-section">
          <SectionHeader
            eyebrow="01 / SYSTEM ARCHITECTURE"
            title="One coordination layer. Multiple operational roles."
            description="The architecture separates presentation, business logic, operational data and future intelligence so each layer can evolve independently."
          />

          <div className="architecture-toggle">
            <button
              className={!architectureFuture ? "selected" : ""}
              onClick={() => setArchitectureFuture(false)}
            >
              Current / MVP
            </button>

            <button
              className={architectureFuture ? "selected" : ""}
              onClick={() => setArchitectureFuture(true)}
            >
              Future Architecture
            </button>
          </div>

          <ArchitectureDiagram future={architectureFuture} />

          <div className="architecture-note">
            <div className="note-icon">
              <LockKeyhole size={20} />
            </div>

            <div>
              <strong>
                {architectureFuture
                  ? "Future expansion"
                  : "Current implementation boundary"}
              </strong>

              <p>
                {architectureFuture
                  ? "The future architecture introduces persistent backend services, multi-centre analytics, notification infrastructure, government integrations and AI-assisted decision support."
                  : "The QR site distinguishes the technical direction from what is currently implemented. Future backend, database, notification and AI components are intentionally labelled rather than presented as completed features."}
              </p>
            </div>
          </div>
        </section>

        {/* WORKFLOW */}
        <section id="workflow" className="section">
          <SectionHeader
            eyebrow="02 / PROCUREMENT WORKFLOW"
            title="The complete farmer journey."
            description="Every step has a defined system responsibility, state transition and visibility point."
          />

          <WorkflowDiagram />

          <div className="state-machine">
            <div className="state-copy">
              <span className="eyebrow">QUEUE STATE MACHINE</span>

              <h3>Queue is not just a list.</h3>

              <p>
                Each farmer moves through explicit states. This makes the
                operational lifecycle easier to validate, audit and visualize.
              </p>
            </div>

            <div className="queue-simulator">
              <div className="queue-sim-top">
                <span className="eyebrow">LIVE LOGIC SIMULATION</span>

                <button
                  className={`simulate-button ${
                    queueRunning ? "running" : ""
                  }`}
                  onClick={runQueueSimulation}
                  disabled={queueRunning}
                >
                  <Zap size={15} />

                  {queueRunning ? "Processing…" : "Simulate Queue"}
                </button>
              </div>

              <div className="queue-states">
                {queueStates.map(([state, description, color], index) => (
                  <div
                    className={`queue-state ${
                      queueIndex === index ? "active" : ""
                    } ${queueIndex > index ? "passed" : ""}`}
                    key={state}
                  >
                    <div className={`state-dot ${color}`}>
                      {queueIndex > index ? (
                        <CheckCircle2 size={15} />
                      ) : (
                        index + 1
                      )}
                    </div>

                    <div>
                      <strong>{state}</strong>
                      <p>{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            ADOPTION RESILIENCE
        ========================================================= */}

        <section id="adoption" className="section adoption-section">
          <SectionHeader
            eyebrow="03 / ADOPTION RESILIENCE"
            title="Farmer participation without farmer dependency."
            description="Digital adoption should increase convenience — not become a single point of failure. Kisaan Mitra supports multiple participation paths while keeping the same operational coordination engine underneath."
          />

          {/* ENGINEERING PRINCIPLE */}

          <div className="adoption-principle">
            <div className="adoption-principle-label">
              ENGINEERING PRINCIPLE
            </div>

            <div className="adoption-principle-main">
              <strong>
                The farmer interface is an access layer.
              </strong>

              <span>
                The centre-side coordination engine is the operational
                backbone.
              </span>
            </div>
          </div>

          {/* PARTICIPATION MODEL */}

          <div className="adoption-model">
            <div className="adoption-column">
              {/* DIRECT */}

              <div className="adoption-path direct-path">
                <div className="adoption-path-top">
                  <span className="adoption-path-index">01</span>

                  <span className="adoption-path-status">
                    DIRECT
                  </span>
                </div>

                <div className="adoption-path-title">
                  DIGITAL FARMER
                </div>

                <div className="adoption-path-subtitle">
                  Self-service participation
                </div>

                <div className="adoption-path-flow">
                  <div>APP / WEB</div>
                  <span>→</span>
                  <div>BOOK SLOT</div>
                  <span>→</span>
                  <div>TRACK STATUS</div>
                </div>

                <p>
                  Farmers who are comfortable with digital tools can
                  independently discover available slots, book a visit and
                  track queue or procurement status.
                </p>
              </div>

              {/* ASSISTED */}

              <div className="adoption-path assisted-path">
                <div className="adoption-path-top">
                  <span className="adoption-path-index">02</span>

                  <span className="adoption-path-status">
                    ASSISTED
                  </span>
                </div>

                <div className="adoption-path-title">
                  ASSISTED FARMER
                </div>

                <div className="adoption-path-subtitle">
                  Operator-assisted participation
                </div>

                <div className="adoption-path-flow">
                  <div>OPERATOR</div>
                  <span>→</span>
                  <div>REGISTER</div>
                  <span>→</span>
                  <div>ASSIGN SLOT</div>
                </div>

                <p>
                  If a farmer is not comfortable using the application,
                  the procurement-centre operator can perform the
                  registration and booking on the farmer's behalf.
                </p>
              </div>

              {/* LOW DIGITAL */}

              <div className="adoption-path low-digital-path">
                <div className="adoption-path-top">
                  <span className="adoption-path-index">03</span>

                  <span className="adoption-path-status">
                    LOW DIGITAL
                  </span>
                </div>

                <div className="adoption-path-title">
                  LOW DIGITAL PARTICIPATION
                </div>

                <div className="adoption-path-subtitle">
                  Centre-side coordination
                </div>

                <div className="adoption-path-flow">
                  <div>CENTRE</div>
                  <span>→</span>
                  <div>TOKEN / RECORD</div>
                  <span>→</span>
                  <div>QUEUE</div>
                </div>

                <p>
                  The centre can continue coordinating registered or
                  assisted arrivals through the operator workflow instead
                  of depending on continuous farmer interaction with the
                  application.
                </p>
              </div>
            </div>

            {/* SHARED COORDINATION ENGINE */}

            <div className="adoption-engine">
              <div className="adoption-engine-label">
                SHARED COORDINATION ENGINE
              </div>

              <div className="adoption-engine-box">
                <div className="adoption-engine-core">
                  <span className="engine-pulse" />

                  <strong>KISAAN MITRA CORE</strong>

                  <small>
                    Same backend coordination layer
                  </small>
                </div>

                <div className="adoption-engine-services">
                  <div>
                    <span>01</span>
                    BOOKING
                  </div>

                  <div>
                    <span>02</span>
                    CAPACITY
                  </div>

                  <div>
                    <span>03</span>
                    QUEUE
                  </div>

                  <div>
                    <span>04</span>
                    PROCUREMENT
                  </div>

                  <div>
                    <span>05</span>
                    AUDIT
                  </div>
                </div>
              </div>

              <div className="adoption-engine-output">
                <div>
                  <span className="output-dot" />
                  CAPACITY CONTROL
                </div>

                <div>
                  <span className="output-dot" />
                  QUEUE MANAGEMENT
                </div>

                <div>
                  <span className="output-dot" />
                  PROCUREMENT STATUS
                </div>
              </div>
            </div>
          </div>

          {/* HOW EACH PATH WORKS */}

          <div className="adoption-explanations">
            <div className="adoption-explanation">
              <div className="explanation-number">01</div>

              <div>
                <h3>Direct participation</h3>

                <p>
                  The farmer interacts directly with the platform.
                  Availability can be viewed before travelling, a slot can
                  be selected and the resulting booking becomes part of the
                  centre's operational queue.
                </p>
              </div>
            </div>

            <div className="adoption-explanation">
              <div className="explanation-number">02</div>

              <div>
                <h3>Assisted participation</h3>

                <p>
                  The operator becomes the digital access point. The farmer
                  does not need to understand the application interface; the
                  operator can create the booking using the same booking and
                  capacity controls.
                </p>
              </div>
            </div>

            <div className="adoption-explanation">
              <div className="explanation-number">03</div>

              <div>
                <h3>Low digital participation</h3>

                <p>
                  Once a booking or token enters the system, queue and
                  capacity management continue on the centre side. The
                  farmer does not need to remain continuously active inside
                  the application.
                </p>
              </div>
            </div>
          </div>

          {/* WHAT IT DOES / DOES NOT MEAN */}

          <div className="adoption-boundaries">
            <div className="boundary-block">
              <div className="boundary-heading">
                <span>✓</span>
                WHAT THIS ENABLES
              </div>

              <ul>
                <li>
                  Farmer participation can be direct or operator-assisted.
                </li>

                <li>
                  The same booking enters the central coordination workflow.
                </li>

                <li>
                  Queue and capacity logic continue after the request is
                  created.
                </li>

                <li>
                  Digital adoption becomes a convenience layer rather than
                  a single point of failure.
                </li>
              </ul>
            </div>

            <div className="boundary-block boundary-warning">
              <div className="boundary-heading">
                <span>!</span>
                WHAT THIS DOES NOT MEAN
              </div>

              <ul>
                <li>
                  Unregistered walk-ins do not automatically disappear.
                </li>

                <li>
                  Physical overcrowding cannot be controlled if demand
                  never enters the coordination system.
                </li>

                <li>
                  Every farmer cannot be assumed to have a smartphone or
                  continuous internet access.
                </li>

                <li>
                  The system therefore focuses on assisted coordination as
                  well as direct digital participation.
                </li>
              </ul>
            </div>
          </div>

          {/* FINAL DESIGN DECISION */}

          <div className="adoption-callout">
            <div className="callout-marker">
              DESIGN DECISION
            </div>

            <div className="callout-content">
              <h3>
                Farmer adoption is not a single point of failure.
              </h3>

              <p>
                Kisaan Mitra separates the{" "}
                <strong>farmer convenience layer</strong> from the{" "}
                <strong>procurement operations layer</strong>. Farmers can
                use the platform directly, while operators can provide
                assisted access when required. This keeps the core
                coordination workflow useful even when digital adoption is
                uneven.
              </p>
            </div>
          </div>
        </section>

        {/* MODULES */}
        <section id="modules" className="section dark-section">
          <SectionHeader
            eyebrow="04 / CORE MODULES"
            title="Designed around the actual procurement operation."
            description="The platform is modular so individual operational capabilities can evolve without rewriting the entire system."
          />

          <div className="module-grid">
            {[
              [
                "01",
                "Booking Engine",
                "Availability → capacity → duplicate check → booking confirmation",
              ],
              [
                "02",
                "Queue Management",
                "Arrivals → active queue → processing → completion",
              ],
              [
                "03",
                "Centre Management",
                "Daily capacity → slots → utilisation → operational load",
              ],
              [
                "04",
                "Procurement Tracking",
                "Booked → arrived → processing → completed → payment visibility",
              ],
              [
                "05",
                "Role Management",
                "Farmer → operator → administrator with controlled permissions",
              ],
              [
                "06",
                "Analytics",
                "Bookings, utilisation, waiting time, processing time and no-shows",
              ],
            ].map(([number, title, text]) => (
              <motion.div
                className="module-card"
                key={number}
                whileHover={{ scale: 1.015 }}
              >
                <span className="module-number">{number}</span>

                <h3>{title}</h3>

                <p>{text}</p>

                <div className="module-line" />

                <span className="planned-label">
                  SYSTEM MODULE
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* BOOKING ENGINE */}
        <section className="section">
          <SectionHeader
            eyebrow="05 / BOOKING ENGINE"
            title="What happens when a farmer presses Book?"
            description="The important part is not the button. It is the sequence of validations behind the button."
          />

          <div className="booking-flow">
            {[
              [
                "01",
                "Authentication",
                "Is the user allowed to create a booking?",
              ],
              [
                "02",
                "Input Validation",
                "Are centre, date and slot values valid?",
              ],
              [
                "03",
                "Centre Validation",
                "Does the selected centre accept this booking?",
              ],
              [
                "04",
                "Capacity Check",
                "Is capacity still available?",
              ],
              [
                "05",
                "Duplicate Check",
                "Does the farmer already have a conflicting booking?",
              ],
              [
                "06",
                "Create Booking",
                "Persist the booking using transaction-safe logic.",
              ],
              [
                "07",
                "Confirmation",
                "Return booking details and queue information.",
              ],
            ].map(([number, title, description]) => (
              <div className="booking-step" key={number}>
                <span>{number}</span>

                <div>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </div>

                {number !== "07" && <ArrowRight size={17} />}
              </div>
            ))}
          </div>

          <div className="concurrency-card">
            <div className="warning-icon">!</div>

            <div>
              <span className="eyebrow">
                EDGE CASE / RACE CONDITION
              </span>

              <h3>Two farmers. One final slot.</h3>

              <p>
                Client-side availability checks are not enough. The final
                booking decision must be validated on the server and
                protected by database constraints / transaction-safe logic.
              </p>
            </div>
          </div>
        </section>

        {/* SECURITY */}
        <section id="security" className="section dark-section">
          <SectionHeader
            eyebrow="06 / SECURITY"
            title="Security follows the request through the stack."
            description="Every request should pass through authentication, authorization, validation and controlled business logic before reaching sensitive data."
          />

          <div className="security-flow">
            {[
              ["01", "Authentication", "Verify identity"],
              ["02", "Authorization", "Verify role"],
              ["03", "Validation", "Reject invalid input"],
              ["04", "Business Logic", "Apply workflow rules"],
              ["05", "Database", "Persist controlled data"],
              ["06", "Audit Log", "Track important actions"],
            ].map(([num, title, desc], index) => (
              <div className="security-step" key={num}>
                <div className="security-number">{num}</div>

                <ShieldCheck size={20} />

                <strong>{title}</strong>

                <span>{desc}</span>

                {index !== 5 && <ArrowRight size={15} />}
              </div>
            ))}
          </div>

          <div className="security-grid">
            {[
              [
                "RBAC",
                "Role-based access prevents users from accessing workflows outside their responsibility.",
              ],
              [
                "Input Validation",
                "Client and server validation reduce malformed or malicious requests.",
              ],
              [
                "Rate Limiting",
                "Protects public APIs from excessive request volume.",
              ],
              [
                "Auditability",
                "Important operational changes should remain traceable.",
              ],
              [
                "Data Minimisation",
                "Only necessary farmer and procurement information should be stored.",
              ],
              [
                "Backup & Recovery",
                "Operational data requires recovery planning for infrastructure failure.",
              ],
            ].map(([title, text]) => (
              <div className="security-card" key={title}>
                <LockKeyhole size={18} />

                <h3>{title}</h3>

                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* RISKS */}
        <section id="risks" className="section">
          <SectionHeader
            eyebrow="07 / FAILURE & RISK"
            title="What happens when things go wrong?"
            description="A serious technical solution is designed around failure modes, not only the happy path."
          />

          <div className="risk-grid">
            {risks.map((item, index) => (
              <motion.div
                className="risk-card"
                key={item.risk}
                whileHover={{ y: -5 }}
              >
                <div className="risk-top">
                  <span>
                    RISK {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="risk-status">
                    MITIGATED
                  </div>
                </div>

                <h3>{item.risk}</h3>

                <div className="risk-block">
                  <small>WHY IT MATTERS</small>
                  <p>{item.problem}</p>
                </div>

                <div className="risk-block mitigation">
                  <small>MITIGATION</small>
                  <p>{item.mitigation}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* INNOVATION */}
        <section id="innovation" className="section innovation-section">
          <div className="innovation-grid">
            <div>
              <span className="eyebrow">
                08 / INNOVATION
              </span>

              <h2>
                From digital booking
                <span> to procurement coordination.</span>
              </h2>

              <p>
                Kisaan Mitra is positioned as a coordination layer rather
                than another isolated agricultural marketplace.
              </p>

              <div className="innovation-flow">
                {[
                  "SLOT",
                  "CAPACITY",
                  "QUEUE",
                  "PROCUREMENT",
                  "STATUS",
                  "ANALYTICS",
                  "INTELLIGENCE",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="innovation-item"
                  >
                    <span>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <strong>{item}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="ecosystem-card">
              <span className="eyebrow">
                ECOSYSTEM POSITIONING
              </span>

              <h3>
                Complement existing digital systems.
              </h3>

              <p>
                Existing government platforms demonstrate digital
                registration, market linkage, tokens or procurement
                workflows. Kisaan Mitra focuses on coordinating the
                operational journey around the procurement visit.
              </p>

              <div className="ecosystem-list">
                {[
                  "e-NAM",
                  "e-Uparjan",
                  "Kapas-Kisan",
                  "CFPP",
                  "State Systems",
                ].map((name) => (
                  <div key={name}>
                    <CheckCircle2 size={16} />
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AI */}
        <section id="ai" className="section dark-section">
          <SectionHeader
            eyebrow="09 / FUTURE INTELLIGENCE"
            title="Turn operational data into decisions."
            description="AI is not placed in the system just because it sounds impressive. It enters where prediction can improve an operational decision."
          />

          <div className="ai-pipeline">
            <div className="pipeline-data">
              <Database size={22} />

              <strong>Operational Data</strong>

              <span>
                Bookings • Queue • Capacity • Processing Time
              </span>
            </div>

            <ArrowRight className="pipeline-arrow" />

            <div className="pipeline-core">
              <BrainCircuit size={26} />

              <strong>Intelligence Layer</strong>

              <span>
                Models + rules + confidence checks
              </span>
            </div>

            <ArrowRight className="pipeline-arrow" />

            <div className="pipeline-output">
              <Sparkles size={22} />

              <strong>Actionable Output</strong>

              <span>
                Prediction • Recommendation • Alert
              </span>
            </div>
          </div>

          <div className="ai-grid">
            {aiCards.map((card) => (
              <motion.div
                className="ai-card"
                key={card.title}
                whileHover={{ y: -5 }}
              >
                <div className="ai-card-icon">
                  <BrainCircuit size={20} />
                </div>

                <h3>{card.title}</h3>

                <div className="ai-detail">
                  <small>INPUT</small>
                  <p>{card.input}</p>
                </div>

                <div className="ai-detail">
                  <small>OUTPUT</small>
                  <p>{card.output}</p>
                </div>

                <div className="ai-user">
                  <span>USER</span>
                  {card.user}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="ai-safety">
            <div>
              <span className="eyebrow">
                AI SAFETY
              </span>

              <h3>
                Prediction should fail safely.
              </h3>
            </div>

            <div className="ai-safety-flow">
              <span>DATA</span>
              <ArrowRight />
              <span>MODEL</span>
              <ArrowRight />
              <span>PREDICTION</span>
              <ArrowRight />
              <span>CONFIDENCE CHECK</span>
              <ArrowRight />
              <span>FALLBACK</span>
            </div>

            <p>
              Low-confidence predictions should fall back to deterministic
              rules or clearly communicate uncertainty instead of silently
              making operational decisions.
            </p>
          </div>
        </section>

        {/* SCALABILITY */}
        <section id="scalability" className="section">
          <SectionHeader
            eyebrow="10 / SCALABILITY"
            title="Start with one centre. Design for a network."
            description="The architecture can evolve from a single-centre prototype into a multi-centre coordination platform."
          />

          <div className="scale-road">
            {[
              [
                "01",
                "MVP",
                "1–2 Centres",
                "Validate core booking + queue workflow",
              ],
              [
                "02",
                "NETWORK",
                "Multi-Centre",
                "Central monitoring and centre-level operations",
              ],
              [
                "03",
                "DISTRICT",
                "District Scale",
                "Cross-centre analytics and capacity planning",
              ],
              [
                "04",
                "STATE",
                "State Scale",
                "Large operational dataset + integrations",
              ],
              [
                "05",
                "INTELLIGENT",
                "Network",
                "Prediction-driven procurement coordination",
              ],
            ].map(([num, title, scale, desc]) => (
              <div className="scale-card" key={num}>
                <span>{num}</span>

                <small>{title}</small>

                <h3>{scale}</h3>

                <p>{desc}</p>
              </div>
            ))}
          </div>

          <div className="multi-centre">
            <div className="central-platform">
              <Network size={25} />

              <strong>
                Central Coordination Platform
              </strong>

              <span>
                Future multi-centre layer
              </span>
            </div>

            <div className="centre-lines">
              {[
                "Centre A",
                "Centre B",
                "Centre C",
              ].map((centre, index) => (
                <div
                  className="centre-card"
                  key={centre}
                >
                  <div className="centre-dot">
                    {index + 1}
                  </div>

                  <strong>{centre}</strong>

                  <span>
                    Capacity • Queue • Procurement
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ROADMAP */}
        <section id="roadmap" className="section dark-section">
          <SectionHeader
            eyebrow="11 / ROADMAP"
            title="Build the coordination layer first. Intelligence comes next."
            description="The roadmap deliberately separates a reliable operational MVP from future automation and AI capabilities."
          />

          <div className="roadmap">
            {[
              [
                "NOW",
                "Core MVP",
                "Role-based UI, centre selection, slot booking, queue workflow and procurement status.",
              ],
              [
                "NEXT",
                "Operational Platform",
                "Backend APIs, database persistence, notifications, audit logs and multi-centre operations.",
              ],
              [
                "FUTURE",
                "Intelligence",
                "Waiting-time prediction, demand forecasting, recommendations and anomaly detection.",
              ],
              [
                "ECOSYSTEM",
                "Integrations",
                "Government APIs, market/MSP data, messaging systems and broader procurement infrastructure.",
              ],
            ].map(([phase, title, description], index) => (
              <div
                className="roadmap-item"
                key={phase}
              >
                <div className="roadmap-marker">
                  {index + 1}
                </div>

                <div className="roadmap-content">
                  <span>{phase}</span>

                  <h3>{title}</h3>

                  <p>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TECH STACK */}
        <section id="tech" className="section">
          <SectionHeader
            eyebrow="12 / TECH STACK"
            title="Technology chosen for the job, not for the buzzwords."
            description="The stack is intentionally modular and familiar so the team can iterate quickly while leaving room for scale."
          />

          <div className="tech-table">
            <div className="tech-row tech-header">
              <span>Layer</span>
              <span>Technology</span>
              <span>Purpose</span>
              <span>Status</span>
            </div>

            {[
              [
                "Frontend",
                "React + TypeScript",
                "Role-based web experience",
                "IMPLEMENTED",
              ],
              [
                "Build",
                "Vite",
                "Fast development and production builds",
                "IMPLEMENTED",
              ],
              [
                "Styling",
                "Tailwind / UI system",
                "Responsive interface",
                "IMPLEMENTED",
              ],
              [
                "State",
                "Zustand",
                "Client-side application state",
                "IMPLEMENTED",
              ],
              [
                "Routing",
                "React Router",
                "Application navigation",
                "IMPLEMENTED",
              ],
              [
                "Backend",
                "FastAPI",
                "REST API + business logic",
                "PLANNED",
              ],
              [
                "Database",
                "PostgreSQL / MySQL",
                "Persistent operational data",
                "PLANNED",
              ],
              [
                "AI",
                "Python ML stack",
                "Prediction + recommendation",
                "FUTURE",
              ],
              [
                "Notifications",
                "SMS / WhatsApp / App",
                "Operational alerts",
                "FUTURE",
              ],
              [
                "Integrations",
                "Government APIs",
                "External ecosystem",
                "FUTURE",
              ],
            ].map(
              ([layer, technology, purpose, status]) => (
                <div
                  className="tech-row"
                  key={layer}
                >
                  <strong>{layer}</strong>

                  <span>{technology}</span>

                  <span>{purpose}</span>

                  <StatusPill
                    type={
                      status === "IMPLEMENTED"
                        ? "implemented"
                        : status === "PLANNED"
                        ? "planned"
                        : "future"
                    }
                  >
                    ● {status}
                  </StatusPill>
                </div>
              )
            )}
          </div>
        </section>

        {/* FINAL */}
        <section className="final-section">
          <div className="final-glow" />

          <span className="eyebrow">
            THE BIG PICTURE
          </span>

          <h2>
            We are not building
            <span> just another farmer app.</span>
          </h2>

          <p>
            We are building a coordination layer for agricultural
            procurement.
          </p>

          <div className="final-flow">
            {[
              "BOOK",
              "COORDINATE",
              "PROCESS",
              "ANALYZE",
              "PREDICT",
              "SCALE",
            ].map((item, index) => (
              <div key={item}>
                <strong>{item}</strong>

                {index !== 5 && (
                  <ArrowRight size={17} />
                )}
              </div>
            ))}
          </div>

          <div className="final-line">
            Kisaan Mitra is designed as a modular coordination layer that
            can evolve from predictable procurement visits today toward
            intelligent procurement planning tomorrow.
          </div>
        </section>
      </main>

      <footer>
        <div>
          <strong>KISAAN MITRA</strong>
          <span>
            Technical Deep Dive • SIH 2026
          </span>
        </div>

        <span>
          Built for judges who want to go deeper.
        </span>
      </footer>
    </div>
  );
}

export default App;