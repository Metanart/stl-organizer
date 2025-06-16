# scripts/refresh.ps1

Write-Host "Cleaning dist, out, and node_modules..."

$pathsToDelete = @("dist", "out", "node_modules")

foreach ($path in $pathsToDelete) {
  if (Test-Path $path) {
    try {
      Remove-Item -Recurse -Force $path
      Write-Host "✓ Removed $path"
    } catch {
      Write-Host "⚠ Failed to remove $path: $_"
    }
  } else {
    Write-Host "Skipped $path (does not exist)"
  }
}
