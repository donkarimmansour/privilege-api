const Host = {
  ROOT: "http://localhost:3001",
  PREFIX: "/v1/api",
  //FRONTEND: "http://localhost:3000",
  FRONTEND: "https://cheap-shop.net",
}
  
const ApiEndpoints = {  

  Auth: { 
    route: `${Host.PREFIX}/auth`, 
    signin: `/signin`, 
    forgot: `/forgot-password`, 
    me: `/me`, 
  },

  Professors: { 
    route: `${Host.PREFIX}/professors`, 
    create: `/create`, 
    edit: `/edit/:id`, 
    delete: `/delete/:id`, 
    count: `/count`, 
    list: `/list`, 
    image: `/image/:id` ,
    profileEdit: `/profileEdit/:id`, 

  },

  Students: { 
    route: `${Host.PREFIX}/students`, 
    create: `/create`, 
    edit: `/edit/:id`, 
    profileEdit: `/profileEdit/:id`, 
    delete: `/delete/:id`, 
    count: `/count`, 
    list: `/list`, 
    image: `/image/:id`
    },

  
  Groupes: { 
    route: `${Host.PREFIX}/groupes`, 
    create: `/create`, 
    edit: `/edit/:id`, 
    delete: `/delete/:id`, 
    count: `/count`, 
    list: `/list`, 
  },


  
  Levels: { 
    route: `${Host.PREFIX}/levels`, 
    create: `/create`, 
    edit: `/edit/:id`, 
    delete: `/delete/:id`, 
    count: `/count`, 
    list: `/list`, 
  },
  
  Department: { 
    route: `${Host.PREFIX}/department`, 
    create: `/create`, 
    edit: `/edit/:id`, 
    delete: `/delete/:id`, 
    count: `/count`, 
    list: `/list`, 
  },

  Course: { 
    route: `${Host.PREFIX}/course`, 
    create: `/create`, 
    edit: `/edit/:id`, 
    delete: `/delete/:id`, 
    count: `/count`, 
    list: `/list`, 
    image: `/image/:id`

  },

  Notifications: { 
    route: `${Host.PREFIX}/notifications`, 
    list: `/list`, 
    create: `/create`, 
    edit: `/edit/:id`, 
    delete: `/delete/:id`, 
  },


  Exam: { 
    route: `${Host.PREFIX}/exam`, 
    create: `/create`, 
    list: `/list`, 
  },

  Smtp: { 
    route: `${Host.PREFIX}/smtp`, 
    edit: `/edit/:id`, 
    list: `/list`, 
  },


  Library: { 
    route: `${Host.PREFIX}/library`, 
    create: `/create`, 
    edit: `/edit/:id`, 
    delete: `/delete/:id`, 
    count: `/count`, 
    list: `/list`, 
  },


  Payments: { 
    route: `${Host.PREFIX}/payments`, 
    create: `/create`, 
    edit: `/edit/:id`, 
    delete: `/delete/:id`, 
    count: `/count`, 
    list: `/list`, 
  },
 
  // Chat: { 
  //   route: `${Host.PREFIX}/chat`, 
  //   getOnline: `/get-online`, 
  //   sendMessage: `/send-message`, 
  //   getMessage: `/get-message`, 
  //   imageMessageSend: `/image-message-send` 
  // },

  File: {
    route: `${Host.PREFIX}/file`,
    getSingleFileView: `/get-single-file/:id/view`,
    getSingleFileDownload: `/get-single-file/:id/download`,
    createSingleFile: `/create-single-file`,
  },


  Admins : { 
    route: `${Host.PREFIX}/admins`, 
    create: `/create`, 
    edit: `/edit/:id`, 
    profileEdit: `/profileEdit/:id`, 
    delete: `/delete/:id`, 
    count: `/count`, 
    list: `/list`, 
    image: `/image/:id`
    },



};

module.exports = {ApiEndpoints , Host}