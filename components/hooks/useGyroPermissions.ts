import { useEffect, useState } from 'react'

export default function useGyroPermissions() {
  const [permission, setPermission] = useState(false)
  useEffect(() => {
    Promise.all([navigator.permissions.query({ name: 'gyroscope' })])
      .then((results) => {
        setPermission(results.every((result) => result.state === 'granted'))
      })
      .catch((e) => {
        console.error(e)
        setPermission(false)
      })
  }, [])
  return permission
}
