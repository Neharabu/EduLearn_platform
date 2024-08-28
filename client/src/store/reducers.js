import { createReducer } from "@reduxjs/toolkit";

const auth_state = {
  auth: false,
};

const overlay_state = {
  login: false,
  unlock: {
    able: false,
    id: "",
  },
  contact: false,
  logout: false,
  delete_course: {
    able: false,
    id: "",
  },
  add_topic: false,
  add_section: {
    able: false,
    id: "",
  },
};

const delete_batch_state = {
  id: "",
  able: false,
};

const day_state={
  id:undefined
}

const navbar_state = {
  navbar: true,
};

const loading_state = {
  loading: false,
};

const user_state = {
  user: {},
};

export const auth_state_reducer = createReducer(auth_state, {
  auth_data: (state, action) => {
    state.auth = action.payload;
  },
});

export const overlay_state_reducer = createReducer(overlay_state, {
  overlay_data: (state, action) => {
    console.log(action.payload);
    state.login = action.payload.login;
    state.unlock = action.payload.unlock || {
      able: false,
      id: "",
    };
    state.contact = action.payload.contact;
    state.logout = action.payload.logout;
    state.delete_course = action.payload.delete_course;
    state.add_topic = action.payload.add_topic || false;
    state.add_section = action.payload.add_section || {
      able: false,
      id: "",
    };
  },
});

export const navbar_state_reducer = createReducer(navbar_state, {
  navbar_data: (state, action) => {
    state.navbar = action.payload.navbar;
  },
});

export const loading_state_reducer = createReducer(loading_state, {
  loading_data: (state, action) => {
    state.loading = action.payload;
  },
});

export const user_state_reducer = createReducer(user_state, {
  user_data: (state, action) => {
    state.user = action.payload;
  },
});

export const delete_batch_state_reducer = createReducer(delete_batch_state, {
  delete_batch_data: (state, action) => {
    state.able = action.payload.able;
    state.id = action.payload.id;
  },
});

export const day_state_reducer =createReducer(day_state,{
  day_data:(state,action)=>{
state.id = action.payload

  }
})
