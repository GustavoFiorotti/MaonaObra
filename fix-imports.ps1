$files = Get-ChildItem -Path "src" -Recurse -Include "*.tsx","*.ts"
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $newContent = $content -replace '@\d+\.\d+\.\d+(["`''])', '$1'
    if ($content -ne $newContent) {
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        Write-Host "Fixed imports in $($file.Name)"
    }
}