# release.ps1 - Robust Version

param([string]$ReleaseType = "")

try {
    $packageJson = Get-Content "package.json" -ErrorAction Stop | ConvertFrom-Json
    $currentVersion = $packageJson.version

    Write-Host "GitHub Release Automation" -ForegroundColor Cyan
    Write-Host "Current version: $currentVersion" -ForegroundColor Yellow

    # Get input
    if ([string]::IsNullOrEmpty($ReleaseType)) {
        do {
            $choice = Read-Host "Pilih ukuran perubahan (1-Kecil, 2-Besar)"
        } while ($choice -notin @("1", "2"))
        
        $ReleaseType = @("kecil", "besar")[[int]$choice - 1]
    }

    # Calculate new version
    $parts = $currentVersion -split '\.'
    if ($ReleaseType -eq "kecil") { 
        $parts[2] = [int]$parts[2] + 1 
    } else { 
        $parts[1] = [int]$parts[1] + 1
        $parts[2] = 0
    }
    $newVersion = $parts -join '.'

    Write-Host "New version: $newVersion" -ForegroundColor Green

    # Confirm
    $confirm = Read-Host "Lanjutkan release? (y/n)"
    if ($confirm -ne 'y') { 
        Write-Host "Release dibatalkan" -ForegroundColor Yellow
        exit 0 
    }

    # Update package.json
    $packageJson.version = $newVersion
    $packageJson | ConvertTo-Json -Depth 10 | Set-Content "package.json"
    Write-Host "Package.json updated" -ForegroundColor Green

    # Git operations
    git add package.json
    git commit -m "release: bump version to $newVersion"
    git tag -a "v$newVersion" -m "Release version v$newVersion"
    git push origin master
    git push origin "v$newVersion"

    Write-Host "Release v$newVersion completed successfully!" -ForegroundColor Green

} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}