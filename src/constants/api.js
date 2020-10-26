

export const HEADERS = {
  DEFAULT_HEADER: { 'Content-Type': 'application/json; charset=UTF-8' },
  JWT_HEADER: () => ({
    // 'Content-Type': 'application/json; charset=UTF-8',
    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
  }),
  file_header: () => ({
    'Content-Type': 'multipart/form-data',
    Authorization: localStorage.getItem('jwtToken'),
  }),
}

export const API = {
  AUTH: {
    login: () => ({
      endpoint: 'auth/login',
      method: 'POST',
    }),
    reginster: () => ({
      endpoint: 'auth/forgotpassword',
      method: 'POST',
    }),
  },
  ACCOUNT: {
    accountUser: () => ({
      endpoint: 'api/account/getbyid',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    changePassword: () => ({
      endpoint: 'api/account/changepassword',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
    updateAccount: () => ({
      endpoint: 'api/account/update',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    })


  },
  USER: {
    getUserManagement: () => ({
      endpoint: 'api/user',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    updateStatusUser: () => ({
      endpoint: 'api/user/activeUser',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
  },


  // FINDBYIDUSER: {
  //   findbyidUser: () => ({
  //     endpoint: 'api/user/findbyid',
  //     method: 'GET',
  //     headers: HEADERS.JWT_HEADER(),
  //   })
  // },

  // DELETE: {
  //   deleteUser: (pramas) => ({
  //     endpoint: `api/user/del?id=${pramas}`,
  //     method: 'DELETE',
  //     headers: HEADERS.JWT_HEADER(),
  //   })
  // },

  USERSYSTEM: {
    getUserSystem: () => ({
      endpoint: 'api/usersystem',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    addUserSystem: () => ({
      endpoint: 'api/usersystem/add',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
    updateUserSystem: () => ({
      endpoint: 'api/usersystem/update',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
    updateStatus: () => ({
      endpoint: 'api/usersystem/updatestatus',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
    deleteUserSystem: () => ({
     endpoint: 'api/usersystem/delete',
      method: 'DELETE',
      headers: HEADERS.JWT_HEADER(),
    })
  },

  SERVICESHOP: {
    getServiceShop: () => ({
      endpoint: 'api/serviceshop',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    getRequest: () => ({
      endpoint: 'api/serviceshop/getserviceshop',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    updateStatus: () => ({
      endpoint: 'api/serviceshop/updatestatus',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    })
  },
  SHOP: {
    getShops: () => ({
      endpoint: 'api/shop',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    updateStatus:() => ({
      endpoint: 'api/shop/updatestatus',
      method: 'POST',
      headers : HEADERS.JWT_HEADER(),
    })
  },
  REPORTS: {
    getYearReport: () => ({
      endpoint: 'api/serviceshop/reportyear',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    getPreviousOfYear: () => ({
      endpoint: 'api/serviceshop/reportpreciousofyear',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    getReportAbouts: () => ({
      endpoint: 'api/serviceshop/reportabout',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    getReportShop: () => ({
      endpoint: 'api/shop/reportyear',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    })
  }
}
