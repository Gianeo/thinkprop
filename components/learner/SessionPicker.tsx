import { MapPin, Video } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Session } from '@/lib/types'

interface SessionPickerProps {
  sessions: Session[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export default function SessionPicker({ sessions, selectedId, onSelect }: SessionPickerProps) {
  return (
    <div className="space-y-3">
      {sessions.map((session) => {
        const isSelected = selectedId === session.id
        const FormatIcon = session.format === 'Virtual' ? Video : MapPin

        return (
          <Button
            key={session.id}
            variant="ghost"
            onClick={() => onSelect(session.id)}
            className={`w-full rounded-lg border-2 p-4 text-left transition ${
              isSelected ? 'border-brand-navy bg-level-0' : 'border-wire-border hover:border-wire-muted'
            }`}
          >
            <p className="font-semibold text-wire-text">
              {session.date} at {session.time}
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm text-wire-label">
              <FormatIcon className="h-4 w-4" />
              {session.location}
            </p>
            <p className={`mt-2 text-sm ${session.seatsLeft <= 5 ? 'font-semibold text-state-critical' : 'text-wire-label'}`}>
              {session.seatsLeft <= 5
                ? `${session.seatsLeft} seats left — filling fast`
                : `${session.seatsLeft} seats left`}
            </p>
          </Button>
        )
      })}
    </div>
  )
}
