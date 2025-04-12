import { Card } from "@/components/ui/card"

export function StatsSection() {
  return (
    <section className="py-12 bg-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Bank Partners */}
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-2xl font-bold text-green-600">30+</div>
            <h3 className="mt-2 text-base font-medium text-gray-900">Banks</h3>
            <p className="text-sm text-gray-500">Trusted Partners</p>
          </Card>

          {/* MAPT */}
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-2xl font-bold text-green-600">$0k+</div>
            <h3 className="mt-2 text-base font-medium text-gray-900">
              MAPT
              <span className="text-xs text-gray-400 ml-1">@BITOMERS</span>
            </h3>
            <p className="text-sm text-gray-500">Monthly Transactions</p>
          </Card>

          {/* Loans Disbursed */}
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-2xl font-bold text-green-600">250M+</div>
            <h3 className="mt-2 text-base font-medium text-gray-900">Core Loan</h3>
            <p className="text-sm text-gray-500"> </p>
          </Card>

          {/* Credit Cards */}
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-2xl font-bold text-green-600">1.5K+</div>
            <h3 className="mt-2 text-base font-medium text-gray-900">Credit Cards</h3>
            <p className="text-sm text-gray-500">Disbursed</p>
          </Card>
        </div>
      </div>
    </section>
  )
}