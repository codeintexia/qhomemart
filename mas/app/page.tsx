"use client"

import { useState, useCallback, useEffect, useMemo, useRef } from "react"
import Link from "next/link"
import { saveDemoInquiryEvent } from "@/lib/demo-event-bridge"
import { runUserInquiryWorkflow } from "@/workflows/run-user-inquiry-workflow"
import {
  Search,
  Home,
  Wrench,
  ChevronRight,
  Mic,
  AlertTriangle,
  Check,
  Copy,
  RotateCcw,
  BarChart3,
  Cpu,
  ArrowRight,
  Package,
  Lightbulb,
  ShoppingBag,
  Users,
  Sparkles,
} from "lucide-react"

// Types
type Screen = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
type Preference = "hemat" | "aman" | "lengkap"

// Phone Shell Component
function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#F0EBE3] via-[#E8E2D9] to-[#F5F0E8]">
      <div className="fixed left-3 right-3 top-3 z-50 flex flex-wrap items-center justify-end gap-2 sm:left-auto sm:right-4 sm:top-4">
        <Link
          href="/"
          aria-label="Go to public home"
          aria-current="page"
          className="max-w-[calc(50vw-0.75rem)] truncate rounded-full border border-[#D71920]/20 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-[#D71920] shadow-sm sm:max-w-none sm:px-3 sm:text-xs"
        >
          Public Home
        </Link>
        <Link
          href="/operations"
          aria-label="Go to operations dashboard"
          className="max-w-[calc(50vw-0.75rem)] truncate rounded-full border border-[#193B8C]/20 bg-[#193B8C] px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-sm transition hover:bg-[#193B8C]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-2 sm:max-w-none sm:px-3 sm:text-xs"
        >
          Operations Dashboard
        </Link>
      </div>
      {/* Desktop phone frame */}
      <div className="hidden md:block relative">
        {/* Phone outer frame */}
        <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-2xl z-10" />
          {/* Screen */}
          <div className="w-[390px] h-[844px] bg-[#FFF8EF] rounded-[2.5rem] overflow-hidden relative">
            <div className="absolute inset-0 overflow-y-auto">{children}</div>
          </div>
          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-600 rounded-full" />
        </div>
      </div>
      {/* Mobile view - full screen */}
      <div className="md:hidden w-full max-w-[430px] min-h-screen bg-[#FFF8EF]">{children}</div>
    </div>
  )
}

// Screen Header Component
function ScreenHeader({
  step,
  totalSteps,
  isJudgeMode = false,
}: {
  step?: number
  totalSteps?: number
  isJudgeMode?: boolean
}) {
  return (
    <div className="flex items-center justify-between px-5 pt-6 pb-2">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#D71920] rounded-lg flex items-center justify-center">
          <Home className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-[#D71920] text-sm">MAS QHomemart</span>
      </div>
      {step && totalSteps && (
        <span className="text-xs text-[#667085] bg-[#F5F5F5] px-3 py-1 rounded-full">
          Langkah {step} dari {totalSteps}
        </span>
      )}
      {isJudgeMode && (
        <span className="text-xs text-white bg-[#193B8C] px-3 py-1 rounded-full">Mode demo juri</span>
      )}
    </div>
  )
}

// Intent Card Component
function IntentCard({
  icon: Icon,
  title,
  description,
  onClick,
  isHighlighted = false,
}: {
  icon: React.ElementType
  title: string
  description: string
  onClick?: () => void
  isHighlighted?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-5 rounded-2xl text-left transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-2 ${isHighlighted
          ? "bg-white border-2 border-[#D71920] shadow-lg shadow-[#D71920]/10"
          : "bg-white border border-[#E5E7EB] shadow-sm hover:shadow-md hover:border-[#D71920]/30"
        }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isHighlighted ? "bg-[#D71920]" : "bg-[#D71920]/10"
            }`}
        >
          <Icon className={`w-6 h-6 ${isHighlighted ? "text-white" : "text-[#D71920]"}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[#1F2933] text-base mb-1">{title}</h3>
          <p className="text-sm text-[#667085] leading-relaxed">{description}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-[#667085] shrink-0 mt-1" />
      </div>
    </button>
  )
}

// Chip Component
function Chip({
  label,
  isSelected,
  onClick,
  variant = "default",
}: {
  label: string
  isSelected: boolean
  onClick: () => void
  variant?: "default" | "yellow"
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-2 ${isSelected
          ? variant === "yellow"
            ? "bg-[#FFD21F] text-[#1F2933] shadow-md"
            : "bg-[#D71920] text-white shadow-md"
          : "bg-white text-[#1F2933] border border-[#E5E7EB] hover:border-[#D71920]/30"
        }`}
    >
      {label}
    </button>
  )
}

// Primary Button Component
function PrimaryButton({
  children,
  onClick,
  variant = "primary",
  fullWidth = true,
  icon: Icon,
}: {
  children: React.ReactNode
  onClick: () => void
  variant?: "primary" | "secondary" | "outline"
  fullWidth?: boolean
  icon?: React.ElementType
}) {
  const baseClasses =
    "flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold text-base transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-2"
  const variantClasses = {
    primary: "bg-[#D71920] text-white shadow-lg shadow-[#D71920]/20 hover:bg-[#D71920]/90",
    secondary: "bg-[#193B8C] text-white shadow-lg shadow-[#193B8C]/20 hover:bg-[#193B8C]/90",
    outline: "bg-white text-[#1F2933] border-2 border-[#E5E7EB] hover:border-[#D71920]/50",
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses[variant]} ${fullWidth ? "w-full" : ""}`}>
      {children}
      {Icon && <Icon className="w-5 h-5" />}
    </button>
  )
}

// Concern Card Component
function ConcernCard({ title, level }: { title: string; level: "Tinggi" | "Sedang" | "Rendah" }) {
  const levelColors = {
    Tinggi: "bg-[#D71920]/10 text-[#D71920] border-[#D71920]/20",
    Sedang: "bg-[#FFD21F]/20 text-[#92700C] border-[#FFD21F]/30",
    Rendah: "bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]/20",
  }

  const iconColors = {
    Tinggi: "text-[#D71920]",
    Sedang: "text-[#92700C]",
    Rendah: "text-[#16A34A]",
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-[#E5E7EB]">
      <div className="flex items-center gap-3">
        <AlertTriangle className={`w-5 h-5 ${iconColors[level]}`} />
        <span className="font-medium text-[#1F2933]">{title}</span>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${levelColors[level]}`}>{level}</span>
    </div>
  )
}

// Product Card Component
function ProductCard({
  name,
  reason,
  budget,
  priority,
}: {
  name: string
  reason: string
  budget: "Hemat" | "Sedang" | "Premium"
  priority: "Tinggi" | "Sedang"
}) {
  return (
    <div className="p-4 bg-white rounded-xl border border-[#E5E7EB] shadow-sm">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-[#1F2933] pr-2">{name}</h4>
        <span
          className={`shrink-0 px-2 py-0.5 rounded text-xs font-medium ${priority === "Tinggi" ? "bg-[#D71920]/10 text-[#D71920]" : "bg-[#FFD21F]/20 text-[#92700C]"
            }`}
        >
          {priority}
        </span>
      </div>
      <p className="text-sm text-[#667085] mb-3 leading-relaxed">{reason}</p>
      <div className="flex items-center gap-2">
        <span className="text-xs text-[#667085]">Budget:</span>
        <span className="text-xs font-medium text-[#193B8C] bg-[#193B8C]/10 px-2 py-0.5 rounded">{budget}</span>
      </div>
    </div>
  )
}

// Agent Card Component
function AgentCard({
  name,
  input,
  output,
  isActive = false,
  index,
}: {
  name: string
  input?: string
  output: string
  isActive?: boolean
  index: number
}) {
  return (
    <div
      className={`p-4 rounded-xl border-2 transition-all duration-300 animate-fade-in ${isActive ? "border-[#D71920] bg-[#D71920]/5 shadow-lg" : "border-[#E5E7EB] bg-white"
        }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? "bg-[#D71920]" : "bg-[#193B8C]"}`}>
          <Cpu className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-[#1F2933] text-sm">{name}</span>
        {isActive && <span className="ml-auto w-2 h-2 bg-[#D71920] rounded-full animate-pulse" />}
      </div>
      {input && (
        <div className="mb-2">
          <span className="text-xs font-medium text-[#667085]">Input:</span>
          <p className="text-sm text-[#1F2933] mt-1 bg-[#F5F5F5] p-2 rounded-lg">{input}</p>
        </div>
      )}
      <div>
        <span className="text-xs font-medium text-[#667085]">Output:</span>
        <p className="text-sm text-[#1F2933] mt-1 bg-[#193B8C]/5 p-2 rounded-lg">{output}</p>
      </div>
    </div>
  )
}

// Insight Card Component
function InsightCard({ title, children, icon: Icon }: { title: string; children: React.ReactNode; icon: React.ElementType }) {
  return (
    <div className="p-4 bg-white rounded-xl border border-[#E5E7EB] shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-[#193B8C]/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-[#193B8C]" />
        </div>
        <h4 className="font-semibold text-[#1F2933]">{title}</h4>
      </div>
      {children}
    </div>
  )
}

// Main App Component
export default function MASQHomemart() {
  const [screen, setScreen] = useState<Screen>(1)
  const [preference, setPreference] = useState<Preference>("hemat")
  const [selectedProblems, setSelectedProblems] = useState<string[]>([])
  const [storyText, setStoryText] = useState("")
  const [showVoiceMessage, setShowVoiceMessage] = useState(false)
  const [showCopyFeedback, setShowCopyFeedback] = useState(false)
  const [userType, setUserType] = useState("Lansia")
  const [userPriority, setUserPriority] = useState("Hemat dulu")
  const [toastMessage, setToastMessage] = useState("")
  const savedDemoEventKey = useRef("")
  const customerNeed = storyText.trim() || (selectedProblems.length > 0 ? selectedProblems.join(", ") : "Kebutuhan rumah belum dijelaskan")
  const inquiryWorkflow = useMemo(
    () =>
      runUserInquiryWorkflow({
        customerNeed,
        selectedProblems,
        preference,
        channel: "Public Home guided intake",
      }),
    [customerNeed, preference, selectedProblems]
  )
  const workflowOutput = inquiryWorkflow.workflow

  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => setToastMessage(""), 4000)
  }

  const navigate = useCallback((newScreen: Screen) => {
    setScreen(newScreen)
  }, [])

  const toggleProblem = (problem: string) => {
    setSelectedProblems((prev) => (prev.includes(problem) ? prev.filter((p) => p !== problem) : [...prev, problem]))
  }

  const handleCopySummary = async () => {
    const summaryText = workflowOutput.staffSummary;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(summaryText);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = summaryText;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error("Failed to copy summary", err);
    }
    setShowCopyFeedback(true)
    setTimeout(() => setShowCopyFeedback(false), 2000)
  }

  const handleVoiceButton = () => {
    setShowVoiceMessage(true)
    setTimeout(() => setShowVoiceMessage(false), 3000)
  }

  useEffect(() => {
    if (screen < 6) {
      return;
    }

    const eventKey = `${inquiryWorkflow.scenarioId}:${selectedProblems.join("|")}:${preference}:${storyText}:${userType}:${userPriority}`;
    if (savedDemoEventKey.current === eventKey) {
      return;
    }

    savedDemoEventKey.current = eventKey;
    const selectedProblemSummary = selectedProblems.length > 0 ? selectedProblems.join(", ") : "Belum ada masalah dipilih";
    saveDemoInquiryEvent({
      eventId: `MAS-DEMO-${Date.now()}`,
      timestamp: new Date().toISOString(),
      source: "public-home",
      customerNeed: storyText.trim() || `${selectedProblemSummary} untuk ${userType}`,
      selectedProblems,
      preference,
      detectedCluster: inquiryWorkflow.detectedCluster,
      scenarioId: inquiryWorkflow.scenarioId,
      scenarioName: inquiryWorkflow.scenarioName,
      selectedWorkflow: inquiryWorkflow.selectedWorkflow,
      workflowOutputSummary: workflowOutput.staffSummary,
      finalRecommendation: inquiryWorkflow.finalDecision,
      recommendedPackage: inquiryWorkflow.recommendedPackage,
      serviceRecommendation: inquiryWorkflow.serviceRecommendation,
      humanReviewRequired: inquiryWorkflow.humanReviewRequired,
      auditStatus: inquiryWorkflow.auditStatus,
      interactionLogSummary: inquiryWorkflow.interactionLog
        .map((entry) => `${entry.stepNumber}. ${entry.sourceAgent} -> ${entry.targetAgent ?? "Final"}: ${entry.outputSummary}`)
        .join(" | "),
    })
  }, [inquiryWorkflow, preference, screen, selectedProblems, storyText, userPriority, userType, workflowOutput.staffSummary])

  // Screen 1: Entry Screen
  const Screen1 = () => (
    <div className="min-h-full flex flex-col animate-fade-in">
      <ScreenHeader />
      <div className="flex-1 px-5 pb-8">
        <div className="mb-6 mt-4">
          <h1 className="text-2xl font-bold text-[#1F2933] mb-2 text-balance">Anda datang untuk apa hari ini?</h1>
          <p className="text-[#667085] leading-relaxed">
            Pilih yang paling dekat. Bisa mulai dari satu barang sederhana atau minta bantuan memilih solusi.
          </p>
        </div>

        <div className="space-y-3 mb-8">
          <IntentCard
            icon={Search}
            title="Beli barang tertentu"
            description="Saya sudah tahu yang ingin dicari."
            onClick={() => showToast("Demo mendukung beberapa skenario terpilih, seperti keamanan kamar mandi, kebocoran pipa, pencahayaan rumah, dan kebutuhan rekomendasi produk.")}
          />
          <IntentCard
            icon={Sparkles}
            title="Selesaikan masalah rumah"
            description="Saya belum tahu produk atau langkah yang tepat."
            onClick={() => navigate(2)}
            isHighlighted
          />
          <IntentCard
            icon={Wrench}
            title="Minta bantuan jasa"
            description="Servis, pemasangan, desain, atau renovasi."
            onClick={() => showToast("Demo mendukung beberapa skenario terpilih, seperti keamanan kamar mandi, kebocoran pipa, pencahayaan rumah, dan kebutuhan rekomendasi produk.")}
          />
        </div>

        {toastMessage && (
          <div className="mb-6 p-4 rounded-xl bg-[#FFF8EF] border border-[#D71920]/20 shadow-sm animate-fade-in flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#D71920] shrink-0" />
            <p className="text-sm text-[#1F2933] leading-relaxed">{toastMessage}</p>
          </div>
        )}

        <div className="bg-white rounded-2xl p-4 border border-[#E5E7EB]">
          <p className="text-sm font-medium text-[#1F2933] mb-3">Mulai dari pilihan:</p>
          <div className="flex flex-wrap gap-2">
            <Chip
              label="Hemat dulu"
              isSelected={preference === "hemat"}
              onClick={() => setPreference("hemat")}
              variant="yellow"
            />
            <Chip
              label="Paling aman"
              isSelected={preference === "aman"}
              onClick={() => setPreference("aman")}
              variant="yellow"
            />
            <Chip
              label="Lebih lengkap"
              isSelected={preference === "lengkap"}
              onClick={() => setPreference("lengkap")}
              variant="yellow"
            />
          </div>
        </div>

        <p className="text-xs text-center text-[#667085] mt-6">
          Cakupan demo QHomemart AI Agent Competition 2026
        </p>
      </div>
    </div>
  )

  // Screen 2: Problem Story Screen
  const Screen2 = () => (
    <div className="min-h-full flex flex-col animate-fade-in">
      <ScreenHeader step={1} totalSteps={6} />
      <div className="flex-1 px-5 pb-8">
        <div className="mb-6 mt-4">
          <h1 className="text-2xl font-bold text-[#1F2933] mb-2 text-balance">Apa masalah di rumah Anda?</h1>
          <p className="text-[#667085] leading-relaxed">
            Pilih kondisi yang paling dekat. Tidak perlu tahu nama produknya.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {[
            "Kamar mandi licin",
            "Butuh pegangan untuk lansia",
            "Pipa bocor",
            "Wastafel / sink bocor",
            "Lampu garasi redup",
            "Area rumah kurang terang",
            "Butuh rekomendasi produk",
            "Butuh bantuan pemasangan",
            "Budget terbatas",
          ].map((problem) => (
            <Chip
              key={problem}
              label={problem}
              isSelected={selectedProblems.includes(problem)}
              onClick={() => toggleProblem(problem)}
            />
          ))}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-[#1F2933] mb-2">Ceritakan singkat jika perlu</label>
          <textarea
            value={storyText}
            onChange={(e) => setStoryText(e.target.value)}
            placeholder="Contoh: Ibu saya sudah lansia dan beberapa kali hampir terpeleset di kamar mandi."
            className="w-full p-4 rounded-xl border border-[#E5E7EB] bg-white text-[#1F2933] placeholder:text-[#667085] resize-none h-24 focus:outline-none focus:ring-2 focus:ring-[#D71920]/30 focus:border-[#D71920]"
          />
        </div>

        <button
          onClick={handleVoiceButton}
          className="flex items-center justify-center gap-2 w-full p-3 rounded-xl border border-[#E5E7EB] bg-white text-[#1F2933] hover:border-[#D71920]/30 transition-all mb-4"
        >
          <Mic className="w-5 h-5 text-[#D71920]" />
          <span className="font-medium">Pakai suara</span>
        </button>

        {showVoiceMessage && (
          <div className="p-4 rounded-xl bg-[#193B8C]/10 border border-[#193B8C]/20 mb-4 animate-fade-in">
            <p className="text-sm text-[#193B8C]">
              Fitur suara sedang disiapkan. Untuk demo ini, Anda bisa memilih kondisi atau mengetik cerita singkat.
            </p>
          </div>
        )}

        <div className="mt-auto pt-4">
          <PrimaryButton onClick={() => navigate(3)} icon={ArrowRight}>
            Lanjut
          </PrimaryButton>
        </div>
      </div>
    </div>
  )

  // Screen 3: Short Guided Question Screen
  const Screen3 = () => (
    <div className="min-h-full flex flex-col animate-fade-in">
      <ScreenHeader step={2} totalSteps={6} />
      <div className="flex-1 px-5 pb-8">
        <div className="mb-6 mt-4">
          <h1 className="text-2xl font-bold text-[#1F2933] mb-2 text-balance">Kami bantu cek sebentar</h1>
          <p className="text-[#667085] leading-relaxed">
            Jawab beberapa pertanyaan sederhana agar saran lebih tepat.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFD21F]/20 rounded-full mb-6">
          <span className="text-sm font-medium text-[#92700C]">2 dari 5</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] mb-4">
          <h3 className="font-semibold text-[#1F2933] mb-4">Siapa yang paling sering memakai kamar mandi ini?</h3>
          <div className="space-y-2">
            {["Lansia", "Anak-anak", "Orang dewasa", "Pengguna dengan keterbatasan gerak"].map((option) => (
              <button
                key={option}
                onClick={() => setUserType(option)}
                className={`w-full p-4 rounded-xl text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-2 ${userType === option
                    ? "bg-[#D71920] text-white"
                    : "bg-[#F5F5F5] text-[#1F2933] hover:bg-[#E5E7EB]"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${userType === option ? "border-white bg-white" : "border-[#E5E7EB]"
                    }`}>
                    {userType === option && <Check className="w-3 h-3 text-[#D71920]" />}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] mb-6">
          <h3 className="font-semibold text-[#1F2933] mb-4">Apa yang paling ingin Anda utamakan?</h3>
          <div className="flex flex-wrap gap-2">
            {["Hemat dulu", "Mudah dipasang", "Lebih aman"].map((option) => (
              <Chip
                key={option}
                label={option}
                isSelected={userPriority === option}
                onClick={() => setUserPriority(option)}
                variant="yellow"
              />
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <PrimaryButton onClick={() => navigate(4)} icon={ArrowRight}>
            Lanjut
          </PrimaryButton>
        </div>
      </div>
    </div>
  )

  // Screen 4: Concern Summary Screen
  const Screen4 = () => (
    <div className="min-h-full flex flex-col animate-fade-in">
      <ScreenHeader step={3} totalSteps={6} />
      <div className="flex-1 px-5 pb-8">
        <div className="mb-6 mt-4">
          <h1 className="text-2xl font-bold text-[#1F2933] mb-2 text-balance">Hal yang perlu diwaspadai</h1>
          <p className="text-[#667085] leading-relaxed">
            Berdasarkan jawaban Anda, ini prioritas yang perlu diperhatikan.
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {workflowOutput.risks.risks.map((risk) => (
            <ConcernCard key={risk.id} title={risk.label} level={risk.severity} />
          ))}
        </div>

        <div className="p-4 rounded-xl bg-[#193B8C]/5 border border-[#193B8C]/10 mb-6">
          <p className="text-sm text-[#193B8C] leading-relaxed">
            Fokuskan belanja pada yang paling penting dulu. Anda tetap bisa mulai dari satu barang sederhana.
          </p>
        </div>

        <div className="mt-auto">
          <PrimaryButton onClick={() => navigate(5)} icon={ArrowRight}>
            Lihat paket solusi
          </PrimaryButton>
        </div>
      </div>
    </div>
  )

  // Screen 5: Solution Bundle Screen — driven by workflowOutput.bundle
  const Screen5 = () => {
    const { bundle } = workflowOutput
    const sectionColors: Record<string, string> = {
      A: "bg-[#D71920]",
      B: "bg-[#FFD21F]",
      C: "bg-[#193B8C]",
    }
    const sectionTextColors: Record<string, string> = {
      A: "text-white",
      B: "text-[#1F2933]",
      C: "text-white",
    }
    return (
      <div className="min-h-full flex flex-col animate-fade-in">
        <ScreenHeader step={4} totalSteps={6} />
        <div className="flex-1 px-5 pb-8">
          <div className="mb-6 mt-4">
            <h1 className="text-2xl font-bold text-[#1F2933] mb-2 text-balance">{bundle.bundleTitle}</h1>
            <p className="text-[#667085] leading-relaxed">{bundle.bundleSubtitle}</p>
          </div>

          {bundle.sections.map((section) => (
            <div key={section.sectionId} className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-6 h-6 rounded-full ${sectionColors[section.sectionId]} flex items-center justify-center`}>
                  <span className={`${sectionTextColors[section.sectionId]} text-xs font-bold`}>{section.sectionId}</span>
                </div>
                <h3 className="font-semibold text-[#1F2933]">{section.label}</h3>
              </div>
              {section.sectionId !== "C" ? (
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <ProductCard
                      key={item.name}
                      name={item.name}
                      reason={item.reason}
                      budget={(item.budgetTier ?? "Hemat") as "Hemat" | "Sedang" | "Premium"}
                      priority={(item.priority ?? "Sedang") as "Tinggi" | "Sedang"}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div key={item.name} className="p-4 bg-white rounded-xl border border-[#E5E7EB] shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <Wrench className="w-5 h-5 text-[#193B8C]" />
                        <h4 className="font-semibold text-[#1F2933]">{item.name}</h4>
                      </div>
                      <p className="text-sm text-[#667085] leading-relaxed">{item.reason}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="mt-auto">
            <PrimaryButton onClick={() => navigate(6)} icon={ArrowRight}>
              Buat ringkasan untuk staf
            </PrimaryButton>
          </div>
        </div>
      </div>
    )
  }

  // Screen 6: Staff Summary Screen — driven by workflowOutput.staffSummary
  const Screen6 = () => (
    <div className="min-h-full flex flex-col animate-fade-in">
      <ScreenHeader step={6} totalSteps={6} />
      <div className="flex-1 px-5 pb-8">
        <div className="mb-6 mt-4">
          <h1 className="text-2xl font-bold text-[#1F2933] mb-2 text-balance">Ringkasan untuk staf toko</h1>
          <p className="text-[#667085] leading-relaxed">
            Tunjukkan atau salin ringkasan ini agar staf lebih cepat membantu Anda.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border-2 border-[#D71920]/20 shadow-lg mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#D71920] flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-[#D71920]">Ringkasan Kebutuhan</span>
          </div>
          <p className="text-[#1F2933] leading-relaxed text-sm">
            {workflowOutput.staffSummary}
          </p>
        </div>

        {showCopyFeedback && (
          <div className="p-3 rounded-xl bg-[#16A34A]/10 border border-[#16A34A]/20 mb-4 animate-fade-in flex items-center gap-2">
            <Check className="w-4 h-4 text-[#16A34A]" />
            <span className="text-sm text-[#16A34A] font-medium">Ringkasan disalin.</span>
          </div>
        )}

        <div className="space-y-3">
          <PrimaryButton onClick={handleCopySummary} variant="primary" icon={Copy}>
            Salin ringkasan
          </PrimaryButton>

          <div className="relative">
            <PrimaryButton onClick={() => navigate(7)} variant="secondary" icon={BarChart3}>
              Lihat insight QHomemart
            </PrimaryButton>
            <span className="absolute -top-2 right-4 text-xs text-white bg-[#193B8C] px-2 py-0.5 rounded-full">
              Mode demo juri
            </span>
          </div>

          <PrimaryButton onClick={() => navigate(1)} variant="outline" icon={RotateCcw}>
            Mulai ulang
          </PrimaryButton>
        </div>
      </div>
    </div>
  )

  // Screen 7: Business Insight Screen — driven by workflowOutput.businessInsight
  const Screen7 = () => {
    const { businessInsight } = workflowOutput
    return (
      <div className="min-h-full flex flex-col animate-fade-in">
        <ScreenHeader isJudgeMode />
        <div className="flex-1 px-5 pb-8">
          <div className="mb-6 mt-4">
            <h1 className="text-2xl font-bold text-[#1F2933] mb-2 text-balance">Insight untuk QHomemart</h1>
            <p className="text-[#667085] leading-relaxed">
              Setiap masalah pelanggan dapat menjadi sinyal untuk produk, layanan, promo, dan keputusan bisnis.
            </p>
          </div>

          <div className="space-y-4">
            <InsightCard title="Masalah pelanggan" icon={Users}>
              <p className="text-[#1F2933] mb-3">{businessInsight.problem}</p>
              <div className="flex flex-wrap gap-2">
                {businessInsight.productCategories.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-[#193B8C]/10 text-[#193B8C] text-xs rounded-full font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </InsightCard>

            <InsightCard title="Peluang paket" icon={Package}>
              <p className="text-[#1F2933] font-medium mb-2">{businessInsight.bundleOpportunity}</p>
              <div className="flex flex-wrap gap-2">
                {["Anti-slip", "Pegangan", "Pencahayaan", "Rak rendah", "Opsi pemasangan"].map((item) => (
                  <span key={item} className="px-2 py-1 bg-[#FFD21F]/20 text-[#92700C] text-xs rounded-full font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </InsightCard>

            <InsightCard title="Peluang bisnis" icon={ShoppingBag}>
              <ul className="space-y-2">
                {businessInsight.businessOpportunities.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#1F2933]">
                    <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </InsightCard>

            <InsightCard title="Peluang digital marketing" icon={Lightbulb}>
              <ul className="space-y-2">
                {businessInsight.digitalMarketingOpportunities.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#1F2933]">
                    <Sparkles className="w-4 h-4 text-[#FFD21F] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </InsightCard>
          </div>

          <div className="mt-6">
            <PrimaryButton onClick={() => navigate(8)} variant="secondary" icon={Cpu}>
              Lihat log kerja AI
            </PrimaryButton>
          </div>
        </div>
      </div>
    )
  }

  // Screen 8: Multi-Agent Work Log Screen — driven by workflowOutput.interactionLog
  const Screen8 = () => {
    const [activeAgentIndex, setActiveAgentIndex] = useState(0)
    const { interactionLog, technicalNote, aiMeta } = workflowOutput

    useEffect(() => {
      const interval = setInterval(() => {
        setActiveAgentIndex((prev) => (prev < 7 ? prev + 1 : 0))
      }, 1200)
      return () => clearInterval(interval)
    }, [])

    const flowSteps = [
      "User Problem",
      "Triage Agent",
      "Risk Agent",
      "Product Agent",
      "Service Agent",
      "Bundle Agent",
      "Staff & Insight Agent",
      "Output",
    ]

    return (
      <div className="min-h-full flex flex-col animate-fade-in">
        <ScreenHeader isJudgeMode />
        <div className="flex-1 px-5 pb-8">
          <div className="mb-6 mt-4">
            <h1 className="text-2xl font-bold text-[#1F2933] mb-2 text-balance">Log kerja multi-agent</h1>
            <p className="text-[#667085] leading-relaxed">
              Ini menunjukkan bagaimana agent bekerja sama sebelum menghasilkan saran.
            </p>
          </div>

          {/* Visual Flow */}
          <div className="bg-white rounded-2xl p-4 border border-[#E5E7EB] mb-6 overflow-x-auto">
            <div className="flex items-center gap-1 min-w-max">
              {flowSteps.map((step, index) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                        activeAgentIndex === index
                          ? index === flowSteps.length - 1
                            ? "bg-[#16A34A] text-white shadow-md shadow-[#16A34A]/20"
                            : "bg-[#D71920] text-white shadow-md shadow-[#D71920]/20"
                          : "bg-[#193B8C]/10 text-[#193B8C]"
                      }`}
                  >
                    {step}
                  </div>
                  {index < flowSteps.length - 1 && <ArrowRight className="w-4 h-4 text-[#667085] mx-1 shrink-0" />}
                </div>
              ))}
            </div>
          </div>

          {/* Agent Cards from interaction log */}
          <div className="space-y-3 mb-6">
            {interactionLog.map((logStep, index) => (
              <AgentCard
                key={logStep.agentName}
                name={logStep.agentName}
                input={logStep.inputSummary}
                output={logStep.outputSummary}
                isActive={index === activeAgentIndex - 1}
                index={index}
              />
            ))}
          </div>

          {/* AI Mode Badge — shows which triage mode was used */}
          <div className="flex items-center gap-2 mb-4">
            <div
              className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                aiMeta.aiMode === "llm-assisted"
                  ? "bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/20"
                  : "bg-[#193B8C]/10 text-[#193B8C] border border-[#193B8C]/20"
              }`}
            >
              {aiMeta.aiMode === "llm-assisted"
                ? "Mode: LLM-assisted triage"
                : "Mode: deterministic fallback"}
            </div>
          </div>

          {/* Technical Note from workflow */}
          <div className="p-4 rounded-xl bg-[#F5F5F5] border border-[#E5E7EB] mb-6">
            <p className="text-xs text-[#667085] leading-relaxed">
              <strong>Catatan teknis:</strong> {technicalNote}
            </p>
          </div>

          <div className="space-y-3">
            <PrimaryButton onClick={() => navigate(6)} variant="outline">
              Kembali ke ringkasan
            </PrimaryButton>
            <PrimaryButton onClick={() => navigate(1)} variant="primary" icon={RotateCcw}>
              Mulai ulang
            </PrimaryButton>
          </div>
        </div>
      </div>
    )
  }

  // Render current screen
  const renderScreen = () => {
    switch (screen) {
      case 1:
        return <Screen1 />
      case 2:
        return <Screen2 />
      case 3:
        return <Screen3 />
      case 4:
        return <Screen4 />
      case 5:
        return <Screen5 />
      case 6:
        return <Screen6 />
      case 7:
        return <Screen7 />
      case 8:
        return <Screen8 />
      default:
        return <Screen1 />
    }
  }

  return <PhoneShell>{renderScreen()}</PhoneShell>
}
