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

  // Professors: { 
  //   route: `${Host.PREFIX}/professors`, 
  //   create: `/create`, 
  //   edit: `/edit`, 
  //   delete: `/delete`, 
  //   count: `/count`, 
  //   list: `/list`, 
  // },

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

  
  // Groupes: { 
  //   route: `${Host.PREFIX}/groupes`, 
  //   create: `/create`, 
  //   edit: `/edit`, 
  //   delete: `/delete`, 
  //   count: `/count`, 
  //   list: `/list`, 
  // },


  
  // Levels: { 
  //   route: `${Host.PREFIX}/levels`, 
  //   create: `/create`, 
  //   edit: `/edit`, 
  //   delete: `/delete`, 
  //   count: `/count`, 
  //   list: `/list`, 
  // },

  // Notifications: { 
  //   route: `${Host.PREFIX}/notifications`, 
  //   list: `/list`, 
  //   create: `/create`, 
  // },

  
  // Department: { 
  //   route: `${Host.PREFIX}/department`, 
  //   create: `/create`, 
  //   edit: `/edit`, 
  //   delete: `/delete`, 
  //   count: `/count`, 
  //   list: `/list`, 
  // },

  // Course: { 
  //   route: `${Host.PREFIX}/course`, 
  //   create: `/create`, 
  //   edit: `/edit`, 
  //   delete: `/delete`, 
  //   count: `/count`, 
  //   list: `/list`, 
  // },

  // Exam: { 
  //   route: `${Host.PREFIX}/exam`, 
  //   create: `/create`, 
  //   list: `/list`, 
  // },

  // Smtp: { 
  //   route: `${Host.PREFIX}/smtp`, 
  //   edit: `/edit`, 
  //   list: `/list`, 
  // },


  // Library: { 
  //   route: `${Host.PREFIX}/library`, 
  //   create: `/create`, 
  //   edit: `/edit`, 
  //   delete: `/delete`, 
  //   count: `/count`, 
  //   list: `/list`, 
  // },


  // Payments: { 
  //   route: `${Host.PREFIX}/payments`, 
  //   create: `/create`, 
  //   edit: `/edit`, 
  //   delete: `/delete`, 
  //   count: `/count`, 
  //   list: `/list`, 
  // },
 
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

  // User: { 
  //   route: `${Host.PREFIX}/user`,
  //   list: `/list`,
  //   edit: `/edit`,
  //   image: `/image`,
  //   me: `/me`,

  // },









  // UserEndpoints: {
  //   route: `${Host.PREFIX}/user`,
  //   list: `/list`,
  //   login: `/login`, 
  //   signup: `/signup`,  
  //   edit: `/edit/:id`,
  //   activate: `/activate/:id`, 
  //   address: `/address/:id`,
  //   image: `/image/:id`,
  //   create: `/create`,
  //   suspension: `/suspension/:id`,
  //   forgotPassword: `/forgot-password`,
  //   resetPassword: `/reset-password/:id`,
  //   confirmEmail: `/confirm-email/:id`,
  //   me: `/me`,
  //   count: `/count`,
  //   rule: `/rule/:id`,
  // },

  // AdminEndpoints: {
  //   route: `${Host.PREFIX}/admin`,
  //   login: `/login`
  //   },
  // ProductsEndpoints: {
  //   route: `${Host.PREFIX}/products`,
  //   list: `/list`,
  //   listtab: `/listtab`,
  //   create: `/create`,
  //   edit: `/edit/:id`,
  //   delete: `/delete/:id`,
  //   duplicate: `/duplicate/:id`,
  //   review: `/review/:id`,
  //   distinct: `/distinct`,
  //   count: `/count`,
  //   views: `/views/:id`,
  //   aliexpress: `/aliexpress/:id`,
  // },
  // OrdersEndpoints: {
  //   route: `${Host.PREFIX}/orders`,
  //   list: `/list`,
  //   calculate: `/calculate`,
  //   create: `/create`,
  //   delete: `/delete/:id`,
  //   duplicate: `/duplicate/:id`,
  //   status: `/status`,
  //   tracking: `/tracking`, 
  //   count: `/count`,
  // },
  // ChatEndpoints: { 
  //   route: `${Host.PREFIX}/chat`, 
  //   getFriends: `/get-friends`, 
  //   getMessage: `/get-message/:p/:id`, 
  //   sendMessage: `/send-message`, 
  //   imageMessageSend: `/image-message-send`, 
  //   seenMessage: `/seen-message`,  
  //   delivaredMessage: `/delivared-message`
  // },

  // FileEndpoints: {
  //   route: `${Host.PREFIX}/file`,
  //   getSingleFileView: `/get-single-file/:id/view`,
  //   getSingleFileDownload: `/get-single-file/:id/download`,
  //   createSingleFile: `/create-single-file`,
  //   createMultipleFile: `/create-multiple-file`, 
  // }, 
 
  
  // wishlistEndpoints: {
  //   route: `${Host.PREFIX}/wishlist`,
  //   list: `/list`,
  //   create: `/create`,
  //   delete: `/delete/:id`,
  //   count: `/count`,
  // },
  // MainEndpoints: {
  //   route: `${Host.PREFIX}/main`,
  //   list: `/list`,
  //   create: `/create`,
  //   edit: `/edit/:id`,
  //   delete: `/delete/:id`,
  //   duplicate: `/duplicate/:id`,
  //   count: `/count`,

  // },
  // IndexEndpoints: {
  //   route: `${Host.PREFIX}/index`,
  //   list: `/list`,
  //   create: `/create`,
  //   edit: `/edit/:id`,
  //   delete: `/delete/:id`,
  //   duplicate: `/duplicate/:id`,
  //   dnd: `/dnd`,
  // },
  // SubscribeEndpoints: {
  //   route: `${Host.PREFIX}/subscribe`,
  //   list: `/list`,
  //   create: `/create`,
  //   count: `/count`,

  // },
  // ContactEndpoints: {
  //   route: `${Host.PREFIX}/contact`,
  //   list: `/list`,
  //   create: `/create` ,
  //   count: `/count`,

  // },

  
  // CatyEndpoints: {
  //   route: `${Host.PREFIX}/caty`,
  //   list: `/list`,
  //   listtab: `/listtab`,
  //   create: `/create`,
  //   edit: `/edit/:id`,
  //   delete: `/delete/:id`,
  //   duplicate: `/duplicate/:id`,
  //   count: `/count`,
  // },

};

module.exports = {ApiEndpoints , Host}