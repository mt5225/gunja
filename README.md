## start service
  - API Server :  `python api_srv.py`

## get status
curl -i -X GET http://localhost:9006/status

## cctv mapping
- F_B1_01,B1_CAM_04,B1_CAM_15
- G_B2_01,B2_CAM_03,B2_CAM_01

## remove unused imports
autoflake --in-place --remove-unused-variables  api_srv.py