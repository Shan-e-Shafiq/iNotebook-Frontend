const hostname = 'https://i-notebook-backend-gray.vercel.app'

// /api/notes/fetchallnotes

export async function fetchallnotes_APIcall(authtoken) {
  let response = await fetch(`${hostname}/api/notes/fetchallnotes`, {
    method: 'GET',
    headers: {
      auth_token: authtoken
    }
  })
  let data = await response.json()
  return data
}

// /api/notes/addnote

export async function addnote_APIcall(Notesdata, authtoken) {
  let response = await fetch(`${hostname}/api/notes/addnotes`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      auth_token: authtoken
    },
    body: JSON.stringify(Notesdata)
  })
  if (response.status == 200) {
    let data = await response.json()
    return { success: true, data: data }
  } else {
    return { success: false }
  }
}

// /api/notes/updatenotes/:id

export async function updateNote_APIcall(id, UpdatedData, authtoken) {
  let response = await fetch(`${hostname}/api/notes/updatenotes/${id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      auth_token: authtoken
    },
    body: JSON.stringify(UpdatedData)
  })
  return await response.json()
}

// /api/notes/deletenotes/:id

export async function deleteNote_APIcall(id, authtoken) {
  let response = await fetch(`${hostname}/api/notes/deletenotes/${id}`, {
    method: 'DELETE',
    headers: {
      auth_token: authtoken
    }
  })
  if (response.status == 200) {
    return true
  } else {
    return false
  }
}

// /api/auth/createuser

export async function signup_APIcall(userdata) {
  let response = await fetch(`${hostname}/api/auth/createuser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userdata)
  })
  if (response.status == 200) {
    let data = await response.json()
    return { flag: true, data: data }

  } else {
    let data = await response.json()
    return { flag: false, data: data }
  }
}

// /api/auth/login

export async function login_APIcall(userdata) {
  let response = await fetch(`${hostname}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userdata)
  })
  if (response.status == 200) {
    let data = await response.json()
    return { flag: true, data: data }

  } else {
    let data = await response.json()
    return { flag: false, data: data }
  }
}