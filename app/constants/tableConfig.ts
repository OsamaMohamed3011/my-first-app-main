import { ColumnConfig, User } from '../types';



export const userTableColumns: ColumnConfig[] = [
  {
    key: 'accountNumber',
    label: 'columns.accountNumber',
    width: 'w-1/6',
    sortable: true
  },
  {
    key: 'name',
    label: 'columns.name',
    width: 'w-1/6',
    render: (user: User) => `${user.firstName} ${user.lastName}`,
    sortable: true
  },
  {
    key: 'email',
    label: 'columns.email',
    width: 'w-1/6',
    sortable: true
  },
  {
    key: 'currency',
    label: 'columns.currency',
    width: 'w-1/6',
    sortable: true
  },
  {
    key: 'type',
    label: 'columns.type',
    width: 'w-1/6',
    sortable: true
  },
  {
    key: 'actions',
    label: 'columns.actions',
    width: 'w-1/6'
  }
]; 