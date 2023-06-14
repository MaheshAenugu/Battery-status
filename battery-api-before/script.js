const batteryLevel = document.querySelector(".batteryLevel");
const batteryCharging = document.querySelector(".batteryCharging");
const batteryChargingTime = document.querySelector(".batteryChargingTime");
const batteryDisChargingTime = document.querySelector(
  ".batteryDisChargingTime"
);

// Battery Api

const battery = () => {
  if ("getBattery" in navigator) {
    navigator.getBattery().then((battery) => {
      function updateAllBatteryDetails() {
        updateChagingInfo();
        updateLevelChange();
        updateDischargingTimeInfo();
        updateChargingTimeInfo();
      }
      updateAllBatteryDetails();

      //1. Battery Charging change
      battery.addEventListener("onchargingchange", () => {
        // console.log("Charging has changed - 20% - 21%");
        updateChagingInfo();
      });

      function updateChagingInfo() {
        let isCharging = battery.charging ? "Yes" : "No";
        batteryCharging.innerHTML = isCharging;
      }

      //2. Battery charging time
      battery.addEventListener("chargingtimechange", () => {
        updateChargingTimeInfo();
      });
      function updateChargingTimeInfo() {
        batteryChargingTime.innerHTML = battery.chargingTime + " seconds";
      }

      //3. Battery Discharging time
      battery.addEventListener("dischargingtimechange", () => {
        updateDischargingTimeInfo();
      });

      function updateDischargingTimeInfo() {
        batteryDisChargingTime.innerHTML = battery.dischargingTime + " seconds";
      }

      //4. Battery level change
      battery.addEventListener("levelchange", () => {
        updateLevelChange();
      });
      function updateLevelChange() {
        const level = battery.level * 100 + "%";
        batteryLevel.innerHTML = level;
      }
    });
  }
};
battery();
