/**
 * Staff & Insight Agent
 *
 * Role: Final agent in the pipeline. Consumes all previous agent outputs
 * to produce two artefacts:
 *
 *   1. staffSummary — a concise, action-ready paragraph that QHomemart staff
 *      can read quickly before or during a customer interaction.
 *
 *   2. businessInsight — aggregated signals (problem category, product
 *      categories, bundle opportunity, business and marketing opportunities)
 *      that management and analytics can use.
 *
 * Current scope: text is deterministic for supported scenarios.
 * Not connected to real QHomemart CRM, analytics, or reporting systems.
 */

import type {
  TriageOutput,
  RiskOutput,
  ProductMatchOutput,
  ServiceMatchOutput,
  BundleOutput,
  StaffInsightOutput,
} from "@/types/mas-types";

/**
 * Runs the Staff & Insight Agent.
 *
 * Produces a fixed staff summary and structured business insight for the
 * bathroom-safety demo. In a production integration phase, this function
 * would generate text dynamically from all upstream agent outputs.
 *
 * @param triage    - Output from the Customer Triage Agent
 * @param risks     - Output from the Context & Risk Agent
 * @param products  - Output from the Product Match Agent
 * @param services  - Output from the Service Match Agent
 * @param bundle    - Output from the Bundle Strategy Agent
 * @returns StaffInsightOutput containing staffSummary and businessInsight
 */
export function runStaffInsightAgent(
  triage: TriageOutput,
  risks: RiskOutput,
  products: ProductMatchOutput,
  services: ServiceMatchOutput,
  bundle: BundleOutput
): StaffInsightOutput {
  void risks;
  void products;
  void services;
  void bundle;

  if (triage.problemCategory === "Kebocoran pipa dapur") {
    return {
      staffSummary:
        "Pelanggan membutuhkan bantuan untuk kebocoran pipa dapur. Prioritas awal adalah menghentikan rembesan, mengecek sumber bocor, dan memastikan ukuran fitting atau seal yang tepat sebelum pembelian. Staff sebaiknya menanyakan lokasi bocor, jenis pipa, dan apakah ada kerusakan kabinet atau lantai di sekitar area sink.",
      businessInsight: {
        problem: "Kebocoran pipa dapur",
        productCategories: ["Plumbing", "Sealant", "Fitting", "Perawatan dapur"],
        bundleOpportunity: "Paket Tanggap Bocor Dapur",
        businessOpportunities: [
          "Meningkatkan attach rate produk plumbing dasar",
          "Mengurangi salah beli melalui validasi staff",
          "Menghubungkan produk plumbing dengan arahan layanan",
          "Membaca pola permintaan perbaikan dapur ringan",
        ],
        digitalMarketingOpportunities: [
          "Konten edukasi: tanda awal pipa dapur bocor",
          "Promo tematik: paket tanggap bocor",
          "Segmentasi: pemilik rumah, renovasi dapur, perawatan sink",
        ],
      },
    };
  }

  return {
    staffSummary:
      "Pelanggan membutuhkan bantuan memilih solusi kamar mandi yang lebih aman untuk lansia. Masalah utama adalah lantai licin, kurang pegangan, dan cahaya kurang jelas. Prioritas awal adalah keset anti-slip, pegangan dinding, dan lampu kamar mandi yang lebih terang. Pelanggan memilih mulai dari opsi hemat, sehingga disarankan mulai dari barang yang paling penting terlebih dahulu. Jika diperlukan, staf dapat membantu mengecek opsi pemasangan atau renovasi ringan.",
    businessInsight: {
      problem: "Kamar mandi licin untuk lansia",
      productCategories: ["Keamanan rumah", "Sanitary", "Lantai", "Pencahayaan"],
      bundleOpportunity: "Paket Kamar Mandi Lebih Aman",
      businessOpportunities: [
        "Meningkatkan peluang pembelian paket",
        "Menghubungkan produk dengan layanan",
        "Membantu staf memahami kebutuhan lebih cepat",
        "Menghasilkan data masalah pelanggan",
      ],
      digitalMarketingOpportunities: [
        "Konten edukasi: Cara membuat kamar mandi lebih aman",
        "Promo tematik: Paket kamar mandi aman",
        "Segmentasi: caregiver, keluarga dengan lansia, rumah baru, renovasi kecil",
      ],
    },
  };
}
