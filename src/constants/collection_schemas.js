const collection_schema = {
  helpmeusers: {
    name: 'helpmeusers',
    columns: {
      name: 'name',
      email: 'email',
      id: 'id',
      password: 'password',
      is_teacher: 'is_teacher',
      is_blocked_chat: 'is_blocked_chat',
    },
  },

  materials: {
    name: 'materials',
    columns: {
      desc: 'desc',
      doc_link: 'doc_link',
      filename: 'filename',
      title: 'title',
      user_name: 'user_name',
      time_added: 'time_added',
    },
  },

  groupchats: {
    name: 'groupchats',
    columns: {
      user_id: 'user_id',
      text: 'text',
      name: 'name',
      is_teacher: 'is_teacher',
      is_blocked_chat: 'is_blocked_chat',
      time_added: 'time_added',
    },
  },
};

export default collection_schema;
