import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DraftItem, FormType } from "@/types/post.types";
import { nanoid } from "nanoid";

type DraftsState = {
  drafts: DraftItem[];
};

const DRAFTS_KEY = "app:drafts";

const loadFromStorage = (): DraftItem[] => {
  try {
    const raw = localStorage.getItem(DRAFTS_KEY);
    if(!raw) return []
    return JSON.parse(raw) as DraftItem[];
  } catch {
    return [];
  }
}

const saveToStorage = (drafts: DraftItem[]) => {
  try {
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
  } catch{}
}

const initialState: DraftsState = {
  drafts: typeof window !== "undefined" ? loadFromStorage() : [],
}

const draftSlice = createSlice({
  name: "drafts",
  initialState,
  reducers: {
    saveDraft(state, action:  PayloadAction<{ type: FormType; data: any; id?: string }>) {
      const { type, data, id } = action.payload;
      const now = new Date().toISOString();
      if(id) {
        state.drafts = state.drafts.map((d) => (d.id === id ? { ...d, data, updatedAt: now } : d));
      } else {
        const newDraft: DraftItem = {
          id: nanoid(),
          type,
          createdAt: now,
          updatedAt: now,
          data,
        };
        state.drafts.unshift(newDraft);
      }
      saveToStorage(state.drafts);
    },
    deleteDrafts(state, action: PayloadAction<string>) {
      state.drafts = state.drafts.filter((d) => (d.id !== action.payload));
      saveToStorage(state.drafts);
    },
    clearDrafts(state) {
      state.drafts = [];
      saveToStorage(state.drafts);
    },
    setDrafts(state, action: PayloadAction<DraftItem[]>) {
      state.drafts = action.payload;
      saveToStorage(state.drafts);
    },
  }
});

export const { saveDraft, deleteDrafts, clearDrafts, setDrafts } = draftSlice.actions;
export default draftSlice.reducer;