import type { Metadata } from "next"
import { PlaceholderPage } from "@/components/layout/placeholder-page"

export const metadata: Metadata = {
  title: "Privacy",
  description: "Placeholder privacy page. This is not a privacy policy.",
}

export default function PrivacyPage() {
  return (
    <PlaceholderPage
      title="Privacy"
      description="This page will explain how estimate requests and contact details are collected and used. It is not a privacy policy yet."
    />
  )
}
