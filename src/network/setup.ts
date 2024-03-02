import PocketBase from "pocketbase"

export const pb = new PocketBase(process.env.NEXT_PUBLIC_API_ENVIRONMENT)

//netsh advfirewall firewall add rule name="TCP Port 5173" dir=in localport=5173 protocol=TCP action=allow
