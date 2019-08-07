import React from 'react'

const NoteContext = React.createContext({
  folders: [],
  notes: []
  // addBookmark: () => {},
  // deleteBookmark: () => {},
})

export default NoteContext
