import * as core from "@actions/core";
import { execSync } from "node:child_process";
import path from "node:path";

export function buildBaseConfig() {
    const prefix = core.getInput("prefix");
    if (prefix) {
        process.chdir(prefix);
        core.debug(`Changed working directory to: ${prefix}`);
    }

    const mixkey = core.getInput("mixkey");
    let keyString = mixkey ? `${mixkey}-android-kernel` : "unknown-android-kernel";
    const paths = [];

    const cacheToolchain = core.getBooleanInput("toolchain");
    if (cacheToolchain) {
        const toolchainHash = execSync('cat cache.key')
            .toString()
            .trim();
        keyString += `-${toolchainHash}`;
        paths.push("toolchain");
    }

    const cacheCcache = core.getBooleanInput("ccache");

    return { keyString, paths, cacheToolchain, cacheCcache };
}
