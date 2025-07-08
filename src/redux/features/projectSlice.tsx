import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProjectState {
  project_id: string;
  name: string;
  city?: string;
  type?: string;
  description?: string;
}

interface ProjectSliceState {
  project: ProjectState | null;
}

const storedProject = localStorage.getItem("selected_project");

const initialState: ProjectSliceState = {
  project: storedProject ? JSON.parse(storedProject) : null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProject: (state, action: PayloadAction<ProjectState>) => {
      state.project = action.payload;
    },
    clearProject: (state) => {
      state.project = null;
    },
  },
});

export const { setProject, clearProject } = projectSlice.actions;
export default projectSlice.reducer;
