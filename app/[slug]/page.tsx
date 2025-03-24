import { notFound } from "next/navigation"
import { supabase } from "@/lib/supabase"
import ClientLayout from "@/app/ClientLayout"

interface PageProps {
  params: {
    slug: string
  }
}

async function getPage(slug: string) {
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

export default async function Page({ params }: PageProps) {
  const page = await getPage(params.slug)

  if (!page) {
    notFound()
  }

  return (
    <ClientLayout>
      <div className="container py-8 md:py-12">
        <h1 className="mb-6 text-3xl font-bold">{page.title}</h1>
        <div className="prose dark:prose-invert max-w-none">
          {page.content}
        </div>
      </div>
    </ClientLayout>
  )
}
