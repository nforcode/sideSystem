import { ElMessage } from 'element-plus'

export function showSuccess(message: string ): void {
  ElMessage({
    showClose: true,
    message,
    type: 'success',
    duration: 3000,
  })
}

export function showError(message: string): void {
  ElMessage({
    showClose: true,
    message,
    type: 'error',
    duration: 3000,
  })
}

export function showInfo(message: string): void {
  ElMessage({
    showClose: true,
    message,
    type: 'info',
    duration: 3000,
  })
}
