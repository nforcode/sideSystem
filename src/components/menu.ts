export interface MenuItem {
  title: string
  code: string
  route: string | null
  component: unknown
  icon: string
  visible: boolean
  subitem: MenuItem[] | null
}

export const mainMenu : MenuItem[] = [
  {
    title: '系統設定',
    code: 'A_0',
    route: null,
    component: null,
    icon: 'Notification',
    visible: true,
    subitem: [
      {
        title: '參數設定',
        code: 'A_1',
        route: '/A_1',
        component: null,
        icon: 'Setting',
        visible: true,
        subitem: null,
      },
      {
        title: '使用者群組',
        code: 'A_2',
        route: '/A_2',
        component: null,
        icon: 'Setting',
        visible: true,
        subitem: null,
      },
      {
        title: '使用者管理',
        code: 'A_3',
        route: '/A_3',
        component: null,
        icon: 'Setting',
        visible: true,
        subitem: null,
      },
    ],
  },
  {
    title: '庫存管理',
    code: 'B_0',
    route: null,
    component: null,
    icon: 'Notification',
    visible: true,
    subitem: [
      {
        title: '品號管理',
        code: 'B_1',
        route: '/B_1',
        component: null,
        icon: 'Setting',
        visible: true,
        subitem: null,
      },
      {
        title: '售價管理',
        code: 'B_2',
        route: '/B_2',
        component: null,
        icon: 'Setting',
        visible: true,
        subitem: null,
      },
      {
        title: '進價管理',
        code: 'B_3',
        route: '/B_3',
        component: null,
        icon: 'Setting',
        visible: true,
        subitem: null,
      },
    ],
  },
  {
    title: '銷售管理',
    code: 'C_0',
    route: null,
    component: null,
    icon: 'Notification',
    visible: true,
    subitem: [
      {
        title: '報價單',
        code: 'C_1',
        route: '/C_1',
        component: null,
        icon: 'Setting',
        visible: true,
        subitem: null,
      },
      {
        title: '訂單',
        code: 'C_2',
        route: '/C_2',
        component: null,
        icon: 'Setting',
        visible: true,
        subitem: null,
      },
      {
        title: '出貨單',
        code: 'C_3',
        route: '/C_3',
        component: null,
        icon: 'Setting',
        visible: true,
        subitem: null,
      },
    ],
  },
  {
    title: '採購管理',
    code: 'D_0',
    route: null,
    component: null,
    icon: 'Notification',
    visible: true,
    subitem: [
      {
        title: '廠商報價單',
        code: 'D_1',
        route: '/D_1',
        component: null,
        icon: 'Setting',
        visible: true,
        subitem: null,
      },
      {
        title: '採購單',
        code: 'D_2',
        route: '/D_2',
        component: null,
        icon: 'Setting',
        visible: true,
        subitem: null,
      },
      {
        title: '進貨單',
        code: 'D_3',
        route: '/D_3',
        component: null,
        icon: 'Setting',
        visible: true,
        subitem: null,
      },
    ],
  },
]
