## TIMESTAMP:

2019-04-03 03:04:31.221388+00

## In each decompressed file:

The file under mbdump/ contains one document (entity) per line, in JSON
format, and is named according to the type of entity in the dump.

## For files not ending in .tar.xz:

Because some files were to big to GitHub, them were split in various files.

To join them execute the following commands (in GNU/Linux):
```
cat artist_aa artist_ab artist_ac artist_ad artist_ae artist_af artist_ag artist_ah artist_ai > artist.tar.xz
rm artist_aa artist_ab artist_ac artist_ad artist_ae artist_af artist_ag artist_ah artist_ai

cat release-group_aa release-group_ab release-group_ac > release-group.tar.xz
rm release-group_aa release-group_ab release-group_ac

cat release_aa release_ab release_ac release_ad release_ae release_af release_ag release_ah release_ai release_aj release_ak release_al release_am release_an release_ao release_ap release_aq release_ar release_as release_at release_au release_av release_aw release_ax release_ay release_az release_ba release_bb release_bc release_bd release_be release_bf release_bg release_bh release_bi release_bj release_bk release_bl release_bm release_bn release_bo release_bp release_bq release_br release_bs release_bt release_bu release_bv release_bw release_bx release_by release_bz release_ca release_cb release_cc release_cd release_ce release_cf release_cg release_ch release_ci release_cj release_ck release_cl release_cm release-group_aa release-group_ab release-group_ac > release.tar.xz
rm release_aa release_ab release_ac release_ad release_ae release_af release_ag release_ah release_ai release_aj release_ak release_al release_am release_an release_ao release_ap release_aq release_ar release_as release_at release_au release_av release_aw release_ax release_ay release_az release_ba release_bb release_bc release_bd release_be release_bf release_bg release_bh release_bi release_bj release_bk release_bl release_bm release_bn release_bo release_bp release_bq release_br release_bs release_bt release_bu release_bv release_bw release_bx release_by release_bz release_ca release_cb release_cc release_cd release_ce release_cf release_cg release_ch release_ci release_cj release_ck release_cl release_cm release-group_aa release-group_ab release-group_ac

cat work_aa work_ab work_ac work_ad > work.tar.xz
rm work_aa work_ab work_ac work_ad
```

## LICENSE:
The license of this dataset is CC0 1.0 Universal. More information in [LICENSE](./LICENSE).

## SOURCE:

http://ftp.musicbrainz.org/pub/musicbrainz/data/json-dumps/
