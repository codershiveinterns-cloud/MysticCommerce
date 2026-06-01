export function ok(data, init = {}) {
  return Response.json(data, init);
}

export function badRequest(message, status = 400) {
  return Response.json({ error: message }, { status });
}

export function unauthorized() {
  return badRequest("Authentication is required.", 401);
}

export function forbidden() {
  return badRequest("Admin access is required.", 403);
}

export async function guarded(handler, { admin = false } = {}) {
  try {
    return await handler();
  } catch (error) {
    if (error.message === "Unauthorized") {
      return unauthorized();
    }

    if (error.message === "Forbidden" || admin) {
      return forbidden();
    }

    console.error(error);
    return badRequest("Something went wrong.", 500);
  }
}
