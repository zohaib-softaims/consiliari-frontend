import { z } from "zod";
import {
  currentRoleExperienceOptions,
  educationLevelOptions,
  employmentType,
  industryOptions,
  promotionBeforeThatOptions,
  relevanceOfEducationOptions,
  time_in_years,
  proficiencyLevelOptions,
} from "../constants/onboardingData";

export const jobInformationSchema = z.object({
  current_job_title: z
    .string({
      required_error: "Current job title is required",
      invalid_type_error: "Current job title must be a string",
    })
    .min(1, "Current job title cannot be empty")
    .max(200, "Current job title is too long"),

  current_company: z
    .string({
      required_error: "Current company is required",
      invalid_type_error: "Current company must be a string",
    })
    .min(1, "Current company cannot be empty")
    .max(200, "Current company name is too long"),

  industry: z.enum(industryOptions, {
    errorMap: () => ({ message: "Please select an industry" }),
  }),

  time_in_current_role: z.enum(time_in_years, {
    errorMap: () => ({ message: "Please select the time in recent role" }),
  }),

  employment_type: z.enum(employmentType, {
    errorMap: () => ({ message: "Please select the employment type" }),
  }),

  location: z
    .string({
      required_error: "Location is required",
      invalid_type_error: "Location must be a string",
    })
    .min(1, "Location cannot be empty")
    .max(200, "Location is too long"),

  total_years_of_experience: z.coerce
    .number({
      required_error: "Total years of experience is required",
      invalid_type_error: "Total years of experience must be a number",
    })
    .min(0.1, { message: "Experience cannot be 0" }),

  promotion_before_that: z.enum(promotionBeforeThatOptions, {
    errorMap: () => ({ message: "Please select an option" }),
  }),

  last_promotion_time: z
    .string({
      required_error: "Last promotion date is required",
      invalid_type_error: "Last promotion date must be a string",
    })
    .refine((val) => !isNaN(Date.parse(val)), "Please enter a valid date (e.g., '2024-05-01')"),
});

const certificateSchema = z.object({
  name: z
    .string({
      required_error: "Certificate name is required",
      invalid_type_error: "Certificate name must be a string",
    })
    .min(1, "Certificate name cannot be empty")
    .max(100, "Certificate name is too long"),

  isActive: z.boolean({
    required_error: "Active status is required",
    invalid_type_error: "isActive must be a boolean",
  }),
});

export const studyInformationSchema = z.object({
  highest_level_of_education: z.enum(educationLevelOptions, {
    errorMap: () => ({ message: "Please select education level" }),
  }),
  field_of_study: z
    .string({
      required_error: "Field of study is required",
      invalid_type_error: "Field of study must be a string",
    })
    .min(1, "Field of study cannot be empty")
    .max(100, "Field of study is too long"),

  institute_name: z
    .string({
      required_error: "Institute name is required",
      invalid_type_error: "Institute name must be a string",
    })
    .min(1, "Institute name cannot be empty")
    .max(100, "Institute name is too long"),

  relevance_of_education: z.enum(relevanceOfEducationOptions, {
    errorMap: () => ({ message: "Please select an option" }),
  }),
  certificates_list: z.array(certificateSchema).min(0, "Certificates list cannot be negative"),
});

export const skillsInformationSchema = z.object({
  top_skills: z
    .array(
      z.object({
        name: z
          .string({
            required_error: "Skill name is required",
            invalid_type_error: "Skill name must be a string",
          })
          .min(1, "Skill name cannot be empty")
          .max(100, "Skill name is too long"),

        proficiency: z.enum(proficiencyLevelOptions, {
          required_error: "Proficiency level is required",
          invalid_type_error: "Invalid proficiency level",
        }),
      })
    )
    .min(5, "At least 5 skills are required")
    .max(7, "Maximum 7 skills allowed"),

  achievements: z
    .string({
      required_error: "Achievement is required",
      invalid_type_error: "Achievement must be a string",
    })
    .min(1, "Achievement cannot be empty")
    .max(1000, "Achievement description is too long"),

  performance_recognition: z
    .string({
      required_error: "Performance recognition is required",
      invalid_type_error: "Performance recognition must be a string",
    })
    .min(1, "Performance recognition cannot be empty")
    .max(1000, "Performance recognition is too long"),

  current_role_experience: z.enum(currentRoleExperienceOptions, {
    errorMap: () => ({ message: "Please select an option" }),
  }),
});

// Export the main resume schema
export const resumeSchema = z.object({
  job_information: jobInformationSchema,
  study_information: studyInformationSchema,
  skills_information: skillsInformationSchema,
});
