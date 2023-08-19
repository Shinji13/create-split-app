export function removeGitBashPrefix(projectName: string) {
  if (projectName.startsWith("/usr/bin/git"))
    return projectName.split("git").at(-1);
  if (projectName.startsWith("C:/Program Files/Git"))
    return projectName.split("Git").at(-1);
  return projectName;
}
