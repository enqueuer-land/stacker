const config = {
    "make_targets": {
        "win32": [
            "squirrel"
        ],
        "darwin": [
            "zip"
        ],
        "linux": [
            "zip",
            "deb",
            "rpm"
        ]
    },
    "electronPackagerConfig": {
        "packageManager": "npm"
    },
    "electronWinstallerConfig": {
        "name": "stacker"
    },
    "electronInstallerDebian": {},
    "electronInstallerRedhat": {},
    "github_repository": {
        "owner": "lopidio",
        "name": "stacker"
    },
    "windowsStoreConfig": {
        "packageName": "",
        "name": ""
    }
}

module.exports = config
