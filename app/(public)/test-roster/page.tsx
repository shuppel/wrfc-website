import { createServerClient } from '@/lib/supabase-server'

export default async function TestRosterPage() {
  try {
    const supabase = createServerClient()
    
    const { data: players, error } = await supabase
      .from('players')
      .select('*')
      .limit(5)
    
    if (error) {
      return (
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Database Error</h1>
          <pre className="bg-red-100 p-4 rounded">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      )
    }
    
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Test Roster Page</h1>
        <p className="mb-4">Found {players?.length || 0} players</p>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(players, null, 2)}
        </pre>
      </div>
    )
  } catch (err) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Runtime Error</h1>
        <pre className="bg-red-100 p-4 rounded">
          {err instanceof Error ? err.message : 'Unknown error'}
        </pre>
      </div>
    )
  }
}