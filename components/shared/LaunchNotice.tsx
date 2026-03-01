'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'

export default function LaunchNotice() {
  const [open, setOpen] = useState(true)

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        hideClose
        onEscapeKeyDown={(event) => event.preventDefault()}
        onPointerDownOutside={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
        className="max-w-xl rounded-xl border border-weak bg-level-2 p-6"
      >
        <DialogTitle className="type-title">Notice</DialogTitle>
        <DialogDescription className="type-body text-calm">
          All work presented in this document is produced solely for hiring evaluation purposes and
          may not be reproduced, distributed, or used in any form without the written consent of
          Gianni J. Favaretto.
        </DialogDescription>
        <div className="flex justify-end">
          <Button onClick={() => setOpen(false)}>Understood</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
