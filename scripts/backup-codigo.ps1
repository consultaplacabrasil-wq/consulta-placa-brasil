# Script de backup do código-fonte
# Exclui node_modules, .next, .vercel e outros arquivos desnecessários

$projectRoot = Split-Path $PSScriptRoot -Parent
$backupDir = Join-Path $projectRoot "backups"
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$zipName = "backup-codigo-$timestamp.zip"
$zipPath = Join-Path $backupDir $zipName

New-Item -ItemType Directory -Force -Path $backupDir | Out-Null

$excludeDirs = @(
  "node_modules",
  ".next",
  ".vercel",
  "backups",
  ".git"
)

Write-Host "📦 Criando backup do código-fonte..."
Write-Host "   Origem: $projectRoot"
Write-Host "   Destino: $zipPath"
Write-Host ""

# Coletar arquivos excluindo pastas desnecessárias
$files = Get-ChildItem -Path $projectRoot -Recurse -File | Where-Object {
  $path = $_.FullName
  $excluded = $false
  foreach ($dir in $excludeDirs) {
    if ($path -like "*\$dir\*" -or $path -like "*\$dir") {
      $excluded = $true
      break
    }
  }
  -not $excluded
}

Write-Host "   Arquivos encontrados: $($files.Count)"

# Criar ZIP
Compress-Archive -Path $files.FullName -DestinationPath $zipPath -Force

$sizeMB = [math]::Round((Get-Item $zipPath).Length / 1MB, 2)

Write-Host ""
Write-Host "✅ Backup do código concluído!"
Write-Host "📁 Arquivo: backups\$zipName"
Write-Host "📏 Tamanho: $sizeMB MB"
