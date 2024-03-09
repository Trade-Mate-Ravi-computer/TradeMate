import React from 'react'

function MonthlyReport() {
  return (
    <div>
      <div class="container mx-auto p-4">
        <h1 class="text-3xl font-semibold mb-4">Monthly Business Report - March 2024</h1>
        <div class="bg-white rounded-lg shadow p-4">
            <h2 class="text-xl font-semibold mb-2">Financial Summary</h2>
            <p class="text-gray-600">Total Revenue: $50,000</p>
            <p class="text-gray-600">Total Expenses: $30,000</p>
            <p class="text-gray-600">Net Profit: $20,000</p>
            <p class="text-gray-600">Total Remaining: $20,000</p>
        </div>
        <div class="mt-4">
            <h2 class="text-xl font-semibold mb-2">Sales Performance</h2>
            <div class="grid grid-cols-2 gap-4">
                <div class="bg-white rounded-lg shadow p-4">
                    <p class="text-gray-600">Product A Sales: 500 units</p>
                    <p class="text-gray-600">Product B Sales: 300 units</p>
                </div>
                <div class="bg-white rounded-lg shadow p-4">
                    <p class="text-gray-600">Product C Sales: 200 units</p>
                    <p class="text-gray-600">Product D Sales: 150 units</p>
                </div>
            </div>
        </div>
        <div class="mt-4">
            <h2 class="text-xl font-semibold mb-2">Top Customers</h2>
            <ul class="list-disc list-inside">
                <li class="text-gray-600">Customer X: $10,000</li>
                <li class="text-gray-600">Customer Y: $8,000</li>
                <li class="text-gray-600">Customer Z: $6,000</li>
            </ul>
        </div>
    </div>
    </div>
  )
}

export default MonthlyReport
