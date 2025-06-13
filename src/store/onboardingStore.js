import { create } from "zustand";
import { persist } from "zustand/middleware";
import { produce } from "immer";

const useOnboardingStore = create(
  persist(
    (set) => ({
      step: 1,
      cvUploaded: false,
      cvName: "",

      setStep: (step) => set({ step }),
      setCvUploaded: (status) => set({ cvUploaded: status }),
      setCvName: (name) => set({ cvName: name }),

      onboardingState: {
        resume: {
          job_information: {
            current_job_title: "",
            current_company: "",
            industry: "",
            time_in_current_role: "",
            employment_type: "",
            location: "",
            total_years_of_experience: "",
            promotion_before_that: "",
            last_promotion_time: "",
          },
          study_information: {
            highest_level_of_education: "",
            field_of_study: "",
            institute_name: "",
            relevance_of_education: "",
            certificates_list: [],
          },
          skills_information: {
            top_skills: [],
            achievements: "",
            performance_recognition: "",
            current_role_experience: "",
          },
        },
        career_blueprint: {
          goals: {
            short_term_goal: "",
            long_term_goal: "",
            no_goals: false,
            readiness_for_next_goal: "",
            development_for_next_role: "",
            challenges_for_goals: "",
            clarity_on_overcoming_obstacle: "1",
          },
          momentum: {
            growth_in_responsibility: "",
            recent_skill_development: "",
            proactive_career_activities: "",
            learning_agility: "",
            proactive_learning_example: "",
            personal_alignment_fulfilment: {
              rating: 1,
              explaination: "",
            },
            seniority_perception: {
              isTrue: "",
              explaination: "",
            },
            industry_growth_trajectory_perception: "",
          },
          market_view: {
            annual_salary: "",
            annual_bonus: "",
            equity: "",
            other_compensation: "",
            compensation_growth_trajectory: "",
          },
          work_style: {
            preferred_coaching_style: "",
            accountability_methods: [],
            reaction_to_setback: "",
            excitement_about_consiliari: "",
          },
          leadership_capabilities: {
            is_manage_team: "",
            team_overall_performance: "",
            perceive_as_a_leader: "",
            relation_with_manager: "",
            self_leadership_assessment: {
              self_awareness: "",
              effective_communication: "",
              interpersonal_relations: "",
              vision: "",
              time_management: "",
              decision_making: "",
              developing_team_members: "",
              team_performance_leadership: "",
              conflict_resolution: "",
              strategic_thinking: "",
              organizational_collaboration: "",
              executive_presence: "",
            },
          },
        },
      },

      updateSection: (path, updater) =>
        set(
          produce((state) => {
            const keys = ["onboardingState", ...path.split(".")];
            let section = state;
            for (let i = 0; i < keys.length - 1; i++) {
              section = section[keys[i]];
            }
            section[keys[keys.length - 1]] = updater(section[keys[keys.length - 1]]);
          })
        ),
      updateResume: (newResume) =>
        set(
          produce((state) => {
            state.onboardingState.resume = {
              ...state.onboardingState.resume,
              ...newResume,
            };
          })
        ),

      resetCvStates: () => set({ cvUploaded: false, cvName: "" }),
    }),

    {
      name: "onboarding-data-storage",
    }
  )
);

export default useOnboardingStore;
