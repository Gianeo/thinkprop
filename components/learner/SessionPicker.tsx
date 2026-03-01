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
            className={`w-full h-auto flex flex-col items-start rounded-sm border-2 p-4 text-left transition ${
              isSelected ? 'border-primary bg-white' : 'border hover:border-strong'
            }`}
          >
            <p className="font-semibold text-default">
              {session.date} at {session.time}
            </p>
            <p className="-mt-1 flex items-center gap-2 type-body-sm text-muted">
              <FormatIcon className="size-4" />
              {session.location}
            </p>
            <p className={`-mt-1 type-body-sm ${session.seatsLeft <= 5 ? 'font-semibold text-destructive-default' : 'text-muted'}`}>
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
