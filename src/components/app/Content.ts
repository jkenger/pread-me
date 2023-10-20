// eslint-disable-next-line @typescript-eslint/no-unused-vars

import {
  ACKNOWLEDGEMENTS,
  API_REFERENCE_TEMPLATE,
  APPENDIX,
  AUTHORS,
  BADGES,
  COLOR_REFERENCE,
  CONTRIBUTING,
  DEMO,
  DEPLOY_MENT,
  DOCUMENTATION,
  DOCUMENTATION_TEMPLATE,
  ENV_VARIABLES,
  FAQ,
  FEATURES,
  FEEDBACK,
  GITHUB_PROFILE_ABOUT_ME,
  GITHUB_PROFILE_INTRODUCTION,
  GITHUB_PROFILE_OTHERS,
  GITHUB_PROFILE_SKILLS,
  GITHUB_PROFLE_LINKS,
  INSTALLATION,
  LESSONS,
  LICENSE,
  LOGO,
  OPTIMIZATIONS,
  PROFILE_TEMPLATE,
  RELATED,
  ROADMAP,
  RUNNING_TESTS,
  RUN_LOCALLY,
  SCREENSHOTS,
  SUPPORT,
  TECH,
  TITLE_AND_DESC_TEMPLATE,
  USAGE_EXAMPLES,
  USED_BY,
} from "./templates";
import { IPread, PreadType } from "../types";

export class Contents {
  contents: IPread[];
  constructor() {
    this.contents = CONTENTS;
  }

  // All function below should have a isActive function that will return the active content

  getContents() {
    return this.contents;
  }

  getContent(id: number) {
    // Must have isActive Function
    return this.contents.find((content: IPread) => content.id === id);

    // return this.contents.find((content: any) => content.id === id);
  }
  getContentByType(type: PreadType) {
    return this.contents.filter((content: IPread) => content.type === type);
  }
  getContentByName(name: string) {
    return this.contents.find(
      (content: IPread) => content.name === name.toLowerCase()
    );
  }
}

export const CONTENTS = [
  {
    id: 1,
    type: PreadType.TEMPLATES,
    name: "documentation",
    originalContent: DOCUMENTATION_TEMPLATE,
    content: DOCUMENTATION_TEMPLATE,
    isActive: 0,
  },
  {
    id: 223,
    type: PreadType.TEMPLATES,
    name: "portfolio",
    originalContent: DOCUMENTATION_TEMPLATE,
    content: DOCUMENTATION_TEMPLATE,
    isActive: 0,
  },
  {
    id: 2,
    type: PreadType.TEMPLATES,
    name: "profile",
    originalContent: PROFILE_TEMPLATE,
    content: PROFILE_TEMPLATE,

    isActive: 0,
  },
  {
    id: 3,
    type: PreadType.SECTIONS,
    name: "API reference",
    originalContent: API_REFERENCE_TEMPLATE,
    content: API_REFERENCE_TEMPLATE,
    isActive: 0,
  },
  {
    id: 4,
    type: PreadType.SECTIONS,
    name: "title and description",
    originalContent: TITLE_AND_DESC_TEMPLATE,
    content: TITLE_AND_DESC_TEMPLATE,
    isActive: 0,
  },
  {
    id: 5,
    type: PreadType.SECTIONS,
    name: "acknowledgements",
    originalContent: ACKNOWLEDGEMENTS,
    content: ACKNOWLEDGEMENTS,
    isActive: 0,
  },
  {
    id: 6,
    type: PreadType.SECTIONS,
    name: "appendix",
    originalContent: APPENDIX,
    content: APPENDIX,
    isActive: 0,
  },
  {
    id: 7,
    type: PreadType.SECTIONS,
    name: "authors",
    originalContent: AUTHORS,
    content: AUTHORS,
    isActive: 0,
  },
  {
    id: 8,
    type: PreadType.SECTIONS,
    name: "badges",
    originalContent: BADGES,
    content: BADGES,
    isActive: 0,
  },
  {
    id: 9,
    type: PreadType.SECTIONS,
    name: "color reference",
    originalContent: COLOR_REFERENCE,
    content: COLOR_REFERENCE,
    isActive: 0,
  },
  {
    id: 10,
    type: PreadType.SECTIONS,
    name: "contributing",
    originalContent: CONTRIBUTING,
    content: CONTRIBUTING,
    isActive: 0,
  },
  {
    id: 11,
    type: PreadType.SECTIONS,
    name: "demo",
    originalContent: DEMO,
    content: DEMO,
    isActive: 0,
  },
  {
    id: 12,
    type: PreadType.SECTIONS,
    name: "documentation",
    originalContent: DOCUMENTATION,
    content: DOCUMENTATION,
    isActive: 0,
  },
  {
    id: 13,
    type: PreadType.SECTIONS,
    name: "deployment",
    originalContent: DEPLOY_MENT,
    content: DEPLOY_MENT,
    isActive: 0,
  },
  {
    id: 14,
    type: PreadType.SECTIONS,
    name: "environment variables",
    originalContent: ENV_VARIABLES,
    content: ENV_VARIABLES,
    isActive: 0,
  },
  {
    id: 15,
    type: PreadType.SECTIONS,
    name: "FAQ",
    originalContent: FAQ,
    content: FAQ,
    isActive: 0,
  },
  {
    id: 16,
    type: PreadType.SECTIONS,
    name: "features",
    originalContent: FEATURES,
    content: FEATURES,
    isActive: 0,
  },
  {
    id: 17,
    type: PreadType.SECTIONS,
    name: "feedback",
    originalContent: FEEDBACK,
    content: FEEDBACK,
    isActive: 0,
  },
  {
    id: 18,
    type: PreadType.SECTIONS,
    name: "github profile - about me",
    originalContent: GITHUB_PROFILE_ABOUT_ME,
    content: GITHUB_PROFILE_ABOUT_ME,
    isActive: 0,
  },
  {
    id: 19,
    type: PreadType.SECTIONS,
    name: "github profile - links",
    originalContent: GITHUB_PROFLE_LINKS,
    content: GITHUB_PROFLE_LINKS,
    isActive: 0,
  },
  {
    id: 20,
    type: PreadType.SECTIONS,
    name: "github profile - others",
    originalContent: GITHUB_PROFILE_OTHERS,
    content: GITHUB_PROFILE_OTHERS,
    isActive: 0,
  },
  {
    id: 21,
    type: PreadType.SECTIONS,
    name: "github profile - introduction",
    originalContent: GITHUB_PROFILE_INTRODUCTION,
    content: GITHUB_PROFILE_INTRODUCTION,
    isActive: 0,
  },
  {
    id: 22,
    type: PreadType.SECTIONS,
    name: "github profile - skills",
    originalContent: GITHUB_PROFILE_SKILLS,
    content: GITHUB_PROFILE_SKILLS,
    isActive: 0,
  },
  {
    id: 23,
    type: PreadType.SECTIONS,
    name: "installation",
    originalContent: INSTALLATION,
    content: INSTALLATION,
    isActive: 0,
  },
  {
    id: 24,
    type: PreadType.SECTIONS,
    name: "lessons",
    originalContent: LESSONS,
    content: LESSONS,
    isActive: 0,
  },
  {
    id: 25,
    type: PreadType.SECTIONS,
    name: "license",
    originalContent: LICENSE,
    content: LICENSE,
    isActive: 0,
  },
  {
    id: 26,
    type: PreadType.SECTIONS,
    name: "logo",
    originalContent: LOGO,
    content: LOGO,
    isActive: 0,
  },
  {
    id: 27,
    type: PreadType.SECTIONS,
    name: "optimizations",
    originalContent: OPTIMIZATIONS,
    content: OPTIMIZATIONS,
    isActive: 0,
  },
  {
    id: 28,
    type: PreadType.SECTIONS,
    name: "related",
    originalContent: RELATED,
    content: RELATED,
    isActive: 0,
  },
  {
    id: 29,
    type: PreadType.SECTIONS,
    name: "roadmap",
    originalContent: ROADMAP,
    content: ROADMAP,
    isActive: 0,
  },
  {
    id: 30,
    type: PreadType.SECTIONS,
    name: "run locally",
    originalContent: RUN_LOCALLY,
    content: RUN_LOCALLY,
    isActive: 0,
  },
  {
    id: 31,
    type: PreadType.SECTIONS,
    name: "screenshots",
    originalContent: SCREENSHOTS,
    content: SCREENSHOTS,
    isActive: 0,
  },
  {
    id: 32,
    type: PreadType.SECTIONS,
    name: "tech",
    originalContent: TECH,
    content: TECH,
    isActive: 0,
  },
  {
    id: 33,
    type: PreadType.SECTIONS,
    name: "running tests",
    originalContent: RUNNING_TESTS,
    content: RUNNING_TESTS,
    isActive: 0,
  },
  {
    id: 34,
    type: PreadType.SECTIONS,
    name: "usage/Examples",
    originalContent: USAGE_EXAMPLES,
    content: USAGE_EXAMPLES,
    isActive: 0,
  },
  {
    id: 35,
    type: PreadType.SECTIONS,
    name: "used by",
    originalContent: USED_BY,
    content: USED_BY,
    isActive: 0,
  },
  {
    id: 36,
    type: PreadType.SECTIONS,
    name: "support",
    originalContent: SUPPORT,
    content: SUPPORT,
    isActive: 0,
  },
];
