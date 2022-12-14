import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { flow } from 'fp-ts/lib/function'
import { RootState } from 'src/redux/store'

export type PreviewData = {
  serverUrl: string
}

const previewDataSlice = createSlice({
  name: 'preview',
  initialState: { serverUrl: '' } as PreviewData,
  reducers: {
    set: (s, a: PayloadAction<PreviewData>) => a.payload,
  },
})

export default previewDataSlice.reducer

// SELECTORS

const getPreviewData = (s: RootState) => s.preview
export const getPreviewServerUrl = flow(getPreviewData, v => v.serverUrl)

// ACTIONS

export const setPreviewData = previewDataSlice.actions.set
