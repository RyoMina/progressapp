// coach.js
window.Coach = {
  analyzeExercise(data) {
    const {
      currentVolume,
      previousVolume,
      completedSets,
      targetSets,
      dayState,
      performedReps,
      targetReps
    } = data;

    // 🩹 Estado del día manda
    if (dayState === "molestias") {
      return "Día con molestias. Prioriza técnica, control y rango cómodo.";
    }

    if (dayState === "bajo") {
      return "Día de baja energía. Mantén el peso y enfócate en buena ejecución.";
    }

    // 🧠 Análisis por reps (si hay datos)
    if (performedReps?.length && targetReps) {
      const minReps = Math.min(...performedReps);
      const maxReps = Math.max(...performedReps);

      // ❌ No todas las series cumplen
      if (minReps < targetReps) {
        return "Buen progreso, pero aún no completas todas las reps objetivo. Mantén el peso y busca consistencia.";
      }

      // ⚠️ Mucha dispersión entre series
      if ((maxReps - minReps) > 2) {
        return "Las reps son irregulares entre series. Consolida antes de subir carga.";
      }

      // ✅ Reps sólidas y estables
      return "Reps consolidadas y consistentes. Puedes probar subir el peso la próxima sesión.";
    }

    // 🧱 Series incompletas
    if (completedSets < targetSets) {
      return "Completa todas las series antes de intentar progresar.";
    }

    // 🆕 Primer registro
    if (previousVolume === 0) {
      return "Primer registro del ejercicio. Úsalo como referencia.";
    }

    // 📊 Progreso por volumen
    const diff = ((currentVolume - previousVolume) / previousVolume) * 100;

    if (diff > 5) {
      return "Buen progreso respecto a la semana pasada. Puedes intentar subir carga o reps.";
    }

    if (diff >= 0) {
      return "Progreso estable. Intenta sumar 1 rep por serie.";
    }

    return "Semana más liviana. Mantén la carga y cuida la técnica.";
  }
};
