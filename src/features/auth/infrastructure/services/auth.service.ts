/* import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { AuthResponse } from "../../domain/models/User";
import { SignInDto } from "../../domain/dto/AuthDto";
import { UserAndRol as User } from "@/features/user/domain/models/UserModel";

import {
  UpdateEmailDto,
  UpdateNameDto,
  UpdatePasswordDto,
} from "../../domain/dto/ProfileDto";
import { HttpResponse } from "@/core/common/http/HttpResponse";
import { CreateAndEditUserDto } from "@/features/user/domain/dtos/UserDto";

export const authApi = createApi({
  reducerPath: "authApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    signUp: builder.mutation<AuthResponse, CreateAndEditUserDto>({
      query: (credentials) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: credentials,
      }),
    }),

    profile: builder.query({
      query: () => "/profile",
      providesTags: ["Profile"],
    }),

    updateEmail: builder.mutation<HttpResponse<User>, UpdateEmailDto>({
      query: (email) => ({
        url: "/profile/update-email",
        method: "PATCH",
        body: { email },
      }),
      invalidatesTags: ["Profile"],
    }),

    updateName: builder.mutation<HttpResponse<User>, UpdateNameDto>({
      query: (name) => ({
        url: "/profile/update-name",
        method: "PATCH",
        body: { name },
      }),
      invalidatesTags: ["Profile"],
    }),

    updatePassword: builder.mutation<HttpResponse<User>, UpdatePasswordDto>({
      query: (data) => ({
        url: "/profile/update-password",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    signIn: builder.mutation<AuthResponse, SignInDto>({
      query: (credentials) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: credentials,
      }),
    }),
    signOut: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/sign-out",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useUpdateEmailMutation,
  useUpdateNameMutation,
  useUpdatePasswordMutation,
  useProfileQuery,
} = authApi;
 */