export default function CurrencyHeader({ handleSectionChange, activeSection }) {
  return (
    <div className="flex cursor-pointer">
      <div className={`w-1/2 py-3 text-center ${activeSection ? ' bg-slate-100 rounded-tl-lg text-slate-400' : ''}`} onClick={() => handleSectionChange(0)}>
        Converter
      </div>
      <div className={`w-1/2 py-3 text-center ${!activeSection ? ' bg-slate-100 rounded-tr-lg text-slate-400' : ''}`} onClick={() => handleSectionChange(1)}>
        Charts
      </div>
    </div>
  )
}