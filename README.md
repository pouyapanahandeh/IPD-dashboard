# IPD public dashboard

A deliberately limited public presentation of the Iran Conflict Risk Observatory research.

The `site/` directory contains only project-created aggregate summaries and market-series coverage metadata. It contains no raw price histories, return features, source archives, row-level UCDP records or conflict probabilities. The research archive remains private.

## Publish manually

Open **Actions → Publish public dashboard (manual) → Run workflow → Run workflow**. Only the six allowlisted assets in `site/` are deployed. A normal commit does not trigger publication. No scheduled job is configured.

## Weekly update

1. Review and update the underlying research in the private IPD project. Keep unresolved cases visible.
2. In that project, update `config/public_release.json` with the actual review date, release note and current verified artifact paths. Updating the page date does not refresh market histories.
3. Run the publication helper in the private project to rebuild, validate and copy only the approved assets into this repository, then manually publish. Do not copy or make public the private research repository or its history.

The public page shows its review date and the market sample cutoff separately. Read the Method & updates section for scope, source attribution and limitations. This descriptive research page is not a forecast or trading signal.
