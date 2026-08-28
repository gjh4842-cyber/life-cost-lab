/** Design note — 생활비랩: 계산기는 개인 상황을 판정하지 않고, 입력한 생활비를 큰 숫자와 명확한 항목으로 정리한다. */
export type CalculatorField = { key: string; label: string; placeholder: string; help: string };
export type CalculatorDefinition = { slug: string; name: string; description: string; fields: CalculatorField[]; resultTitle: string; resultDescription: string; note: string; guideSlugs?: string[] };

export const calculators: CalculatorDefinition[] = [
  {
    slug: "monthly-living-cost",
    name: "월 생활비 계산기",
    description: "월 수입과 고정비·변동지출을 입력해 이번 달 생활비와 남는 금액을 정리합니다.",
    fields: [
      { key: "income", label: "한 달 수입", placeholder: "예: 3000000", help: "세금·공제 후 실제로 쓸 수 있는 금액을 기준으로 적어 보세요." },
      { key: "fixed", label: "한 달 고정지출", placeholder: "예: 1200000", help: "월세, 관리비, 통신비, 보험료처럼 반복되는 비용입니다." },
      { key: "variable", label: "한 달 변동지출", placeholder: "예: 700000", help: "식비, 교통비, 취미처럼 달마다 달라지는 비용입니다." },
    ],
    resultTitle: "이번 달 생활비 합계",
    resultDescription: "고정지출과 변동지출을 더한 값입니다.",
    note: "입력한 금액을 더하고 빼는 단순 계산 결과입니다. 개인별 생활비의 적정 수준을 판단하지 않습니다.",
    guideSlugs: ["monthly-budget-calculator-guide", "monthly-living-costs-first-list", "food-budget-planning", "irregular-expense-budget"],
  },
  {
    slug: "car-annual-cost",
    name: "자동차 연간 유지비 계산기",
    description: "보험·세금·정비·주차·연료비를 입력해 1년 동안 준비할 차량 유지비를 계산합니다.",
    fields: [
      { key: "insurance", label: "연간 보험료", placeholder: "예: 800000", help: "갱신 안내서 또는 이전 납부 내역을 참고하세요." },
      { key: "tax", label: "연간 자동차세", placeholder: "예: 250000", help: "실제 고지서 또는 공식 납부 안내를 기준으로 적으세요." },
      { key: "maintenance", label: "연간 정비·소모품 비용", placeholder: "예: 500000", help: "최근 정비 이력과 예상 점검 비용을 합산합니다." },
      { key: "monthlyDriving", label: "월 연료·주차비", placeholder: "예: 250000", help: "한 달 기준 금액을 입력하면 12개월로 계산합니다." },
    ],
    resultTitle: "연간 차량 유지비",
    resultDescription: "입력한 연간 비용과 월 운행비 12개월분을 더한 값입니다.",
    note: "차종, 주행거리, 지역, 차량 상태에 따라 실제 비용은 달라질 수 있습니다.",
    guideSlugs: ["car-cost-calculator-guide", "annual-car-maintenance-costs", "car-insurance-renewal-check", "car-tax-payment-check", "tire-replacement-check"],
  },
  {
    slug: "travel-budget",
    name: "여행 예상비용 계산기",
    description: "인원과 교통·숙소·식비·체험 비용을 입력해 여행 전체 예산을 미리 정리합니다.",
    fields: [
      { key: "transport", label: "교통비 합계", placeholder: "예: 180000", help: "왕복 교통과 현지 이동비를 합산하세요." },
      { key: "stay", label: "숙소비 합계", placeholder: "예: 240000", help: "세금·수수료가 포함된 최종 금액인지 확인하세요." },
      { key: "food", label: "식비 합계", placeholder: "예: 180000", help: "여행 전체 기간의 예상 식비를 적습니다." },
      { key: "activity", label: "관광·체험·기타", placeholder: "예: 100000", help: "입장권, 체험, 예비비 등 필요한 항목을 합칩니다." },
    ],
    resultTitle: "여행 예상비용",
    resultDescription: "입력한 교통·숙소·식비·기타 비용의 합계입니다.",
    note: "예약 가격과 현지 비용은 시기와 인원, 제공 조건에 따라 달라질 수 있습니다.",
    guideSlugs: ["day-trip-budget-plan", "domestic-trip-cost-checklist", "domestic-trip-route-plan", "train-bus-travel-cost", "travel-accommodation-check"],
  },
  {
    slug: "fixed-cost-rate",
    name: "고정지출 비율 계산기",
    description: "월 수입 중 매달 반복해서 나가는 고정지출이 차지하는 비율을 확인합니다.",
    fields: [
      { key: "income", label: "한 달 수입", placeholder: "예: 3000000", help: "한 달 기준으로 일관되게 입력하세요." },
      { key: "fixed", label: "한 달 고정지출", placeholder: "예: 1200000", help: "월세, 관리비, 통신비, 보험료 등을 합산합니다." },
    ],
    resultTitle: "월 수입 중 고정지출 비율",
    resultDescription: "고정지출을 월 수입으로 나눈 단순 비율입니다.",
    note: "개인의 소득, 가족 구성, 주거 환경에 따라 필요한 지출은 다릅니다. 이 결과는 비교를 돕는 참고용입니다.",
    guideSlugs: ["monthly-living-costs-first-list", "reduce-household-fixed-costs", "telecom-bill-check", "utility-bill-reading", "irregular-expense-budget"],
  },
  {
    slug: "saving-amount",
    name: "절약금액 계산기",
    description: "줄이려는 월 지출과 목표 기간을 입력해 기간 동안의 절약 예상금액을 계산합니다.",
    fields: [
      { key: "before", label: "현재 한 달 지출", placeholder: "예: 300000", help: "현재 실제 결제 내역을 기준으로 적습니다." },
      { key: "after", label: "줄인 뒤 한 달 지출", placeholder: "예: 220000", help: "계약·해지 비용 등을 고려한 예상 지출을 적으세요." },
      { key: "months", label: "계산할 기간(개월)", placeholder: "예: 12", help: "실제로 비교하고 싶은 개월 수를 입력합니다." },
    ],
    resultTitle: "기간 내 절약 예상금액",
    resultDescription: "현재 지출과 줄인 뒤 지출의 차이를 기간만큼 계산한 값입니다.",
    note: "실제 절약 결과는 이용량, 계약 조건, 생활 변화에 따라 달라질 수 있습니다.",
    guideSlugs: ["reduce-household-fixed-costs", "monthly-living-costs-first-list", "food-budget-planning", "telecom-bill-check", "utility-bill-reading"],
  },
];

export const getCalculator = (slug: string) => calculators.find((calculator) => calculator.slug === slug);
