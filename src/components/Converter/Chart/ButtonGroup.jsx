import { DAYS_AGO } from "../../../app/constants";

export default function ButtonGroup({handleButtonAction, rangeType}) {
  return (
    <div className="flex justify-center gap-3 mt-6">
      {
        DAYS_AGO.map((dayAgo) => (
          <button className="rounded-full text-white shadow-md bg-indigo-500 px-4 py-2 disabled:opacity-50 disabled:cursor-default"
            key={dayAgo.value}
            disabled={dayAgo.value === rangeType}
            onClick={() => handleButtonAction(dayAgo.value)}>{dayAgo.name}</button>
        ))
      }
    </div>
  )
}