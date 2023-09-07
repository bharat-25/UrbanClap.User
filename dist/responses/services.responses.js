"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESPONSE_MESSAGES = exports.RESPONSE_CODES = void 0;
exports.RESPONSE_CODES = {
    CREATED: 201,
    SUCCESS: 200,
    CONFLICT: 409,
    BADREQUEST: 400,
    NOTFOUND: 404,
    UNAUTHORIZED: 401,
    INTERNAL_SERVER_ERROR: 500,
};
exports.RESPONSE_MESSAGES = {
    INTERNAL_SERVER_ERROR: 'INTERNAL SERVER ERROR',
    SERVICE_ALREADY_EXIST: 'SERVICE WITH THE SAME CATEGORY_ID ALREADY EXISTS',
    SERVICE_ADDED: 'SERVICE ADDED SUCCESSFULLY',
    SHOW_ALL_SERVICES: 'ALL SERVICES GETTED',
    BAD_REQUEST: 'BAD REQUEST',
    UNAUTHORIZED: 'UNAUTHORIZED',
    IS_ADMIN: 'ACCESS DENIED',
    ACCESS_DENIED: 'YOU ARE NOT ADMIN',
    NOT_FOUND: 'TOKEN NOT FOUND',
    CREADTED: 'USER CREATED',
    BOOKING: 'SUCCESSFULL BOOKING',
    BOOKING_NOT_FOUND: 'BOOKING NOT FOUND',
    BOOKING_FOUND: 'BOOKING FOUND',
    SERVICE_DELETE: 'SERVICE DELETE SUCCESSFULLY',
    ALREADY_EXIST: 'USER ALREADY EXIST'
};
//# sourceMappingURL=services.responses.js.map