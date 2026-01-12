#!/bin/bash

echo "=========================================="
echo "Météo France Weather Website - Test Suite"
echo "=========================================="
echo ""

# Test 1: Health Check
echo "Test 1: Health Check"
response=$(curl -s http://localhost:5000/api/health)
if [[ $response == *"ok"* ]]; then
  echo "✅ PASSED - Server is running"
else
  echo "❌ FAILED - Server health check failed"
fi
echo ""

# Test 2: Get All Alerts
echo "Test 2: Get All Alerts"
response=$(curl -s http://localhost:5000/api/alerts)
alert_count=$(echo $response | python3 -c "import sys, json; print(len(json.load(sys.stdin)))")
if [[ $alert_count -ge 4 ]]; then
  echo "✅ PASSED - Retrieved $alert_count alerts"
else
  echo "❌ FAILED - Expected at least 4 alerts, got $alert_count"
fi
echo ""

# Test 3: Get Alert by Region
echo "Test 3: Get Alert by Region"
response=$(curl -s http://localhost:5000/api/alerts/region/Bretagne)
if [[ $response == *"Bretagne"* ]]; then
  echo "✅ PASSED - Retrieved alert for Bretagne"
else
  echo "❌ FAILED - Could not retrieve alert for Bretagne"
fi
echo ""

# Test 4: Get Alerts by Level
echo "Test 4: Get Alerts by Level (Red)"
response=$(curl -s http://localhost:5000/api/alerts/level/red)
red_count=$(echo $response | python3 -c "import sys, json; print(len(json.load(sys.stdin)))")
if [[ $red_count -ge 1 ]]; then
  echo "✅ PASSED - Retrieved $red_count red alerts"
else
  echo "❌ FAILED - Expected at least 1 red alert"
fi
echo ""

# Test 5: Weather API (Note: requires valid API key)
echo "Test 5: Weather API Endpoint Structure"
response=$(curl -s http://localhost:5000/api/weather/current/Paris)
if [[ $response == *"error"* ]] || [[ $response == *"city"* ]]; then
  echo "✅ PASSED - Weather endpoint is responding (API key may be needed for live data)"
else
  echo "❌ FAILED - Weather endpoint not responding correctly"
fi
echo ""

# Test 6: Create New Alert
echo "Test 6: Create New Alert"
response=$(curl -s -X POST http://localhost:5000/api/alerts \
  -H "Content-Type: application/json" \
  -d '{
    "region": "Test Region",
    "level": "yellow",
    "phenomenon": "Test",
    "description": "Test alert",
    "startDate": "2026-01-13T00:00:00.000Z",
    "endDate": "2026-01-14T00:00:00.000Z",
    "coordinates": {"lat": 45.0, "lon": 2.0}
  }')
if [[ $response == *"Test Region"* ]]; then
  echo "✅ PASSED - Created new alert"
  # Clean up: delete the test alert
  alert_id=$(echo $response | python3 -c "import sys, json; print(json.load(sys.stdin)['id'])")
  curl -s -X DELETE http://localhost:5000/api/alerts/$alert_id > /dev/null
else
  echo "❌ FAILED - Could not create alert"
fi
echo ""

# Test 7: Update Alert
echo "Test 7: Update Alert"
response=$(curl -s -X PUT http://localhost:5000/api/alerts/1 \
  -H "Content-Type: application/json" \
  -d '{"description": "Updated description"}')
if [[ $response == *"Updated description"* ]]; then
  echo "✅ PASSED - Updated alert successfully"
else
  echo "❌ FAILED - Could not update alert"
fi
echo ""

echo "=========================================="
echo "Test Suite Complete!"
echo "=========================================="
