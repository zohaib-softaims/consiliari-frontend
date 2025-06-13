import { useCallback, useState } from "react";
import ProgressBar from "../components/onboarding-components/ProgressBar";
import AuthHeader from "../components/shared/AuthHeader";
import ButtonGroupField from "../components/shared/ButtonGroupField";
import SimpleSliderField from "../components/shared/SimpleSliderField";
import useOnboardingStore from "../store/onboardingStore";
import { onboardingStep2 } from "../constants/onboardingProgressBarSteps";
import { leadershipCapabilitiesSchema } from "../validations/careerBluePrintValidations";
import { validateForm } from "../utils/validateForm";
import { perceiveAsALeaderOptions, relationWithManagerOptions, teamPerformanceOptions } from "../constants/onboardingData";
import YesNoButtonGroupField from "../components/shared/YesNoButtonGroupField";

const OnboardingLeadershipPage = () => {
  const leadershipCapabilitiesState = useOnboardingStore((state) => state.onboardingState.career_blueprint.leadership_capabilities);
  const updateSection = useOnboardingStore((state) => state.updateSection);
  const setStep = useOnboardingStore((state) => state.setStep);
  const step = useOnboardingStore((state) => state.step);
  const [errors, setErrors] = useState({});

  const handleFieldChange = useCallback(
    (field, value) => {
      updateSection(`career_blueprint.leadership_capabilities.${field}`, () => value);
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    [updateSection]
  );

  const handleNestedFieldChange = useCallback(
    (parentField, field, value) => {
      updateSection(`career_blueprint.leadership_capabilities.${parentField}.${field}`, () => value);
      setErrors((prev) => ({ ...prev, [parentField]: undefined })); // Clear error for parent if a nested field changes
    },
    [updateSection]
  );

  const handleNext = () => {
    const fieldErrors = validateForm(leadershipCapabilitiesSchema, leadershipCapabilitiesState);
    console.log("field errors", fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-white">
      <AuthHeader />
      <div className="max-w-5xl mx-auto pt-8 px-6">
        <div className="text-center mt-8 mb-8">
          <div className="text-sm text-[#2f279c] mb-3">Step 2/2</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Crafting Your Career Blueprint</h2>
        </div>

        <ProgressBar steps={onboardingStep2} offset={5} />

        <div className="space-y-6 mt-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-[#766ee4] mb-1">Leadership & Capabilities</h3>
            <p className="text-sm text-[#737373] mb-6">This section focuses on your demonstrated Leadership capabilities</p>
          </div>

          <div className="space-y-7">
            {/* Manage Team Field */}
            <YesNoButtonGroupField
              label="Leadership and Team Dynamics:"
              description="Do you currently manage or lead a team?"
              name="is_manage_team"
              value={leadershipCapabilitiesState.is_manage_team}
              onChange={(value) => handleFieldChange("is_manage_team", value)}
              error={errors.is_manage_team}
            />

            {/* Team Performance Field */}

            <ButtonGroupField
              label="How would you rate your team’s overall performance?"
              name="team_overall_performance"
              value={leadershipCapabilitiesState.team_overall_performance}
              options={teamPerformanceOptions}
              onChange={(value) => handleFieldChange("team_overall_performance", value)}
              error={errors.team_overall_performance}
            />

            {/* Perceive as a Leader Field */}
            <ButtonGroupField
              label="How do you think your key stakeholders or partners perceive you as a leader?"
              name="perceive_as_a_leader"
              value={leadershipCapabilitiesState.perceive_as_a_leader}
              options={perceiveAsALeaderOptions}
              onChange={(value) => handleFieldChange("perceive_as_a_leader", value)}
              error={errors.perceive_as_a_leader}
              required
            />

            {/* Relation with Manager Field */}
            <ButtonGroupField
              label="Managerial Relationship:"
              description="How would you characterize your relationship with your current manager?"
              name="relation_with_manager"
              value={leadershipCapabilitiesState.relation_with_manager}
              options={relationWithManagerOptions}
              onChange={(value) => handleFieldChange("relation_with_manager", value)}
              error={errors.relation_with_manager}
              required
            />

            {/* Self-Leadership Assessment Section */}
            <p className={`block text-sm font-bold text-[#020817] mb-1`}>Self-Assessment of Leadership Skills:</p>
            <p className="text-sm text-[#737373] mb-6">
              Rate your confidence in demonstrating each leadership capability regularly on a scale from 0 (Not confident) to 100 (Highly
              confident).
            </p>

            <SimpleSliderField
              key="self_awareness"
              label="Self Awareness"
              description="(Openness to new perspectives and feedback):"
              name="self_awareness"
              value={leadershipCapabilitiesState.self_leadership_assessment.self_awareness}
              onChange={(value) => handleNestedFieldChange("self_leadership_assessment", "self_awareness", value)}
              error={errors.self_leadership_assessment?.self_awareness}
            />

            <SimpleSliderField
              key="effective_communication"
              label="Effective Communication"
              description="(Clear, courageous, and collaborative interactions):"
              name="effective_communication"
              value={leadershipCapabilitiesState.self_leadership_assessment.effective_communication}
              onChange={(value) => handleNestedFieldChange("self_leadership_assessment", "effective_communication", value)}
              error={errors.self_leadership_assessment?.effective_communication}
            />

            <SimpleSliderField
              key="interpersonal_relations"
              label="Interpersonal Relations"
              description="(Building strong, collaborative relationships):"
              name="interpersonal_relations"
              value={leadershipCapabilitiesState.self_leadership_assessment.interpersonal_relations}
              onChange={(value) => handleNestedFieldChange("self_leadership_assessment", "interpersonal_relations", value)}
              error={errors.self_leadership_assessment?.interpersonal_relations}
            />

            <SimpleSliderField
              key="vision"
              label="Vision"
              description="(Setting clear, data-informed goals):"
              name="vision"
              value={leadershipCapabilitiesState.self_leadership_assessment.vision}
              onChange={(value) => handleNestedFieldChange("self_leadership_assessment", "vision", value)}
              error={errors.self_leadership_assessment?.vision}
            />

            <SimpleSliderField
              key="time_management"
              label="Time Management"
              description="(Effectively prioritizing tasks based on data):"
              name="time_management"
              value={leadershipCapabilitiesState.self_leadership_assessment.time_management}
              onChange={(value) => handleNestedFieldChange("self_leadership_assessment", "time_management", value)}
              error={errors.self_leadership_assessment?.time_management}
            />

            <SimpleSliderField
              key="decision_making"
              label="Decision Making"
              description="(Leading decisively and proactively):"
              name="decision_making"
              value={leadershipCapabilitiesState.self_leadership_assessment.decision_making}
              onChange={(value) => handleNestedFieldChange("self_leadership_assessment", "decision_making", value)}
              error={errors.self_leadership_assessment?.decision_making}
            />

            <SimpleSliderField
              key="developing_team_members"
              label="Developing Team Members"
              description="(Supporting team growth and collaboration):"
              name="developing_team_members"
              value={leadershipCapabilitiesState.self_leadership_assessment.developing_team_members}
              onChange={(value) => handleNestedFieldChange("self_leadership_assessment", "developing_team_members", value)}
              error={errors.self_leadership_assessment?.developing_team_members}
            />

            <SimpleSliderField
              key="team_performance_leadership"
              label="Team Performance Leadership"
              description="(Driving team effectiveness and achievement):"
              name="team_performance_leadership"
              value={leadershipCapabilitiesState.self_leadership_assessment.team_performance_leadership}
              onChange={(value) => handleNestedFieldChange("self_leadership_assessment", "team_performance_leadership", value)}
              error={errors.self_leadership_assessment?.team_performance_leadership}
            />

            <SimpleSliderField
              key="conflict_resolution"
              label="Conflict Resolution"
              description="(Effectively managing and resolving disputes):"
              name="conflict_resolution"
              value={leadershipCapabilitiesState.self_leadership_assessment.conflict_resolution}
              onChange={(value) => handleNestedFieldChange("self_leadership_assessment", "conflict_resolution", value)}
              error={errors.self_leadership_assessment?.conflict_resolution}
            />

            <SimpleSliderField
              key="strategic_thinking"
              label="Strategic Thinking"
              description="(Applying analytical insights to plan strategically):"
              name="strategic_thinking"
              value={leadershipCapabilitiesState.self_leadership_assessment.strategic_thinking}
              onChange={(value) => handleNestedFieldChange("self_leadership_assessment", "strategic_thinking", value)}
              error={errors.self_leadership_assessment?.strategic_thinking}
            />

            <SimpleSliderField
              key="organizational_collaboration"
              label="Organizational Collaboration"
              description="(Engaging effectively across the organization):"
              name="organizational_collaboration"
              value={leadershipCapabilitiesState.self_leadership_assessment.organizational_collaboration}
              onChange={(value) => handleNestedFieldChange("self_leadership_assessment", "organizational_collaboration", value)}
              error={errors.self_leadership_assessment?.organizational_collaboration}
            />

            <SimpleSliderField
              key="executive_presence"
              label="Executive Presence"
              description="(Confident and influential professional presence):"
              name="executive_presence"
              value={leadershipCapabilitiesState.self_leadership_assessment.executive_presence}
              onChange={(value) => handleNestedFieldChange("self_leadership_assessment", "executive_presence", value)}
              error={errors.self_leadership_assessment?.executive_presence}
            />
          </div>
        </div>
        <div className="flex justify-between mb-8">
          <button className="px-6 py-2 rounded bg-gray-200 text-gray-700" onClick={handleBack}>
            Back
          </button>
          <button className="px-6 py-2 rounded bg-[#2f279c] text-white" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingLeadershipPage;
